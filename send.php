<?php
/**
 * Приём заявок с формы на сайте BF GROUP.
 * Полная заявка сохраняется на сервере (leads.jsonl вне папки сайта) и уходит на почту.
 * В Telegram отправляется только уведомление «Новая заявка №N» — без персональных данных.
 * Настройки (токен бота, чат, почта) лежат в config.php на уровень выше public_html.
 */

header('Content-Type: application/json; charset=utf-8');

function reply($ok, $error = null) {
    echo json_encode(['ok' => $ok, 'error' => $error], JSON_UNESCAPED_UNICODE);
    exit;
}

function mail_log($line) {
    @file_put_contents(__DIR__ . '/../mail-errors.log', date('d.m.Y H:i') . " | $line\n", FILE_APPEND | LOCK_EX);
}

/**
 * Отправка письма через SMTP Яндекса (ssl, порт 465) — как почтовая программа.
 * Вход делается РОВНО ОДИН раз: при отказе не повторяем, чтобы Яндекс не заблокировал ящик.
 */
function smtp_send($user, $password, $to, $subject, $body) {
    $fp = @stream_socket_client('ssl://smtp.yandex.ru:465', $errno, $errstr, 15);
    if (!$fp) {
        mail_log("SMTP: нет соединения с smtp.yandex.ru:465 ($errno $errstr)");
        return false;
    }
    stream_set_timeout($fp, 15);

    $read = function () use ($fp) {
        $data = '';
        while (($line = fgets($fp, 1024)) !== false) {
            $data .= $line;
            if (strlen($line) < 4 || $line[3] !== '-') {
                break;
            }
        }
        return $data;
    };
    $cmd = function ($line, $expect) use ($fp, $read) {
        if ($line !== null) {
            fwrite($fp, $line . "\r\n");
        }
        $answer = $read();
        return [substr($answer, 0, 3) === $expect, trim($answer)];
    };

    $steps = [
        [null, '220', 'приветствие'],
        ['EHLO bfgroup-ai.ru', '250', 'EHLO'],
        ['AUTH LOGIN', '334', 'AUTH'],
        [base64_encode($user), '334', 'логин'],
        [base64_encode($password), '235', 'пароль (неверный логин или пароль приложения)'],
        ["MAIL FROM:<$user>", '250', 'MAIL FROM'],
        ["RCPT TO:<$to>", '250', 'RCPT TO'],
        ['DATA', '354', 'DATA'],
    ];
    foreach ($steps as [$line, $expect, $what]) {
        [$ok, $answer] = $cmd($line, $expect);
        if (!$ok) {
            mail_log("SMTP: отказ на шаге «{$what}»: " . mb_substr($answer, 0, 200));
            fclose($fp);
            return false;
        }
    }

    $message = "From: BF GROUP <$user>\r\n"
             . "To: <$to>\r\n"
             . "Subject: =?UTF-8?B?" . base64_encode($subject) . "?=\r\n"
             . "Date: " . date('r') . "\r\n"
             . "MIME-Version: 1.0\r\n"
             . "Content-Type: text/plain; charset=UTF-8\r\n"
             . "Content-Transfer-Encoding: base64\r\n\r\n"
             . chunk_split(base64_encode($body));
    [$ok, $answer] = $cmd($message . "\r\n.", '250');
    if (!$ok) {
        mail_log("SMTP: письмо не принято: " . mb_substr($answer, 0, 200));
    }
    fwrite($fp, "QUIT\r\n");
    fclose($fp);
    return $ok;
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    reply(false, 'Метод не поддерживается');
}

$configPath = __DIR__ . '/../config.php';
if (!file_exists($configPath)) {
    http_response_code(500);
    reply(false, 'Форма не настроена. Напишите нам в Telegram или на почту.');
}
$config = require $configPath;

// --- ловушка для ботов: поле скрыто от людей, заполняют только спамеры ---
if (!empty($_POST['company'])) {
    reply(true); // делаем вид, что всё хорошо, но никуда не отправляем
}

// --- не чаще одной заявки в минуту с одного адреса ---
$ip = $_SERVER['REMOTE_ADDR'] ?? 'unknown';
$throttleFile = sys_get_temp_dir() . '/bfgroup_lead_' . md5($ip);
if (file_exists($throttleFile) && (time() - filemtime($throttleFile)) < 60) {
    reply(false, 'Заявка уже отправлена. Подождите минуту, пожалуйста.');
}

$name    = trim($_POST['name'] ?? '');
$contact = trim($_POST['contact'] ?? '');
$task    = trim($_POST['task'] ?? '');
$consent = !empty($_POST['consent']);

if ($name === '' || $contact === '' || $task === '') {
    reply(false, 'Заполните все поля.');
}
if (!$consent) {
    reply(false, 'Нужно согласие на обработку персональных данных.');
}
if (mb_strlen($name) > 80 || mb_strlen($contact) > 120 || mb_strlen($task) > 2000) {
    reply(false, 'Слишком длинный текст.');
}

$source = trim($_POST['source'] ?? '');
$when   = date('d.m.Y H:i');

// --- 1. сохраняем заявку на нашем сервере, вне папки сайта ---
// Файл лежит на уровень выше public_html, из интернета он недоступен.
// Номер заявки = порядковый номер строки в файле.
$leadsFile = __DIR__ . '/../leads.jsonl';
$leadId = 0;
$fh = @fopen($leadsFile, 'c+');
if ($fh && flock($fh, LOCK_EX)) {
    while (fgets($fh) !== false) {
        $leadId++;
    }
    $leadId++;
    fwrite($fh, json_encode([
        'id'      => $leadId,
        'time'    => $when,
        'name'    => $name,
        'contact' => $contact,
        'task'    => $task,
        'source'  => $source,
        'consent' => true,
        'ip'      => $ip,
    ], JSON_UNESCAPED_UNICODE) . "\n");
    fflush($fh);
    flock($fh, LOCK_UN);
    fclose($fh);
    @chmod($leadsFile, 0600);
}
$saved = $leadId > 0;
$num   = $saved ? '№' . $leadId : 'без номера';

// --- 2. полная заявка — только на почту ---
$mailed = false;
if (!empty($config['email'])) {
    $subject = "Заявка $num с сайта BF GROUP";
    $body    = "Новая заявка $num с сайта bfgroup-ai.ru\r\n\r\n"
             . "Имя: $name\r\n"
             . "Контакт: $contact\r\n"
             . "Задача: $task\r\n"
             . ($source !== '' ? "Кнопка: $source\r\n" : '')
             . "Время: $when\r\n";

    $smtpPass = $config['smtp_password'] ?? '';
    if (!empty($config['smtp_user']) && $smtpPass !== '' && strpos($smtpPass, 'ВСТАВЬТЕ') !== 0) {
        // основной способ: через ящик на Яндексе
        $mailed = smtp_send($config['smtp_user'], $config['smtp_password'], $config['email'], $subject, $body);
    } else {
        // запасной способ: mail() хостинга (письма могут не доходить до Яндекса)
        $from    = $config['mail_from'] ?? 'site@bfgroup-ai.ru';
        $headers = "From: BF GROUP <$from>\r\n"
                 . "MIME-Version: 1.0\r\n"
                 . "Content-Type: text/plain; charset=UTF-8\r\n";
        // -f — адрес отправителя «на конверте», по нему почта проверяет SPF домена
        $mailed = @mail($config['email'], '=?UTF-8?B?' . base64_encode($subject) . '?=', $body, $headers, '-f' . $from);
        if (!$mailed) {
            mail_log("заявка $num | mail() не отправил письмо");
        }
    }
}

// --- 3. в Telegram — только уведомление, без персональных данных ---
// Имя, контакт и текст задачи сюда НЕ попадают.
if (!empty($config['telegram_token']) && !empty($config['telegram_chat_id'])) {
    $text = "🔔 Новая заявка $num";
    if ($source !== '') {
        $text .= " · Кнопка: " . strip_tags($source);
    }
    $text .= " · $when. Подробности на почте";

    $url = 'https://api.telegram.org/bot' . $config['telegram_token'] . '/sendMessage';
    $ch = curl_init($url);
    curl_setopt_array($ch, [
        CURLOPT_POST           => true,
        CURLOPT_POSTFIELDS     => http_build_query([
            'chat_id' => $config['telegram_chat_id'],
            'text'    => $text,
        ]),
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_TIMEOUT        => 10,
    ]);
    curl_exec($ch);
    curl_close($ch);
}

@touch($throttleFile);

if (!$saved && !$mailed) {
    reply(false, 'Не удалось отправить заявку. Напишите нам в Telegram или на почту.');
}

reply(true);
