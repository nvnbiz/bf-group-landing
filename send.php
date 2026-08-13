<?php
/**
 * Приём заявок с формы на сайте BF GROUP.
 * Отправляет заявку в Telegram и дублирует на почту.
 * Настройки (токен бота, чат, почта) лежат в config.php на уровень выше public_html.
 */

header('Content-Type: application/json; charset=utf-8');

function reply($ok, $error = null) {
    echo json_encode(['ok' => $ok, 'error' => $error], JSON_UNESCAPED_UNICODE);
    exit;
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

$clean = function ($s) {
    return htmlspecialchars(strip_tags($s), ENT_QUOTES, 'UTF-8');
};

$source = trim($_POST['source'] ?? '');
$when   = date('d.m.Y H:i');

$text  = "<b>Новая заявка с сайта</b>\n\n";
$text .= "<b>Имя:</b> " . $clean($name) . "\n";
$text .= "<b>Контакт:</b> " . $clean($contact) . "\n";
$text .= "<b>Задача:</b> " . $clean($task) . "\n\n";
if ($source !== '') {
    $text .= "Кнопка: " . $clean($source) . "\n";
}
$text .= "Время: " . $when;

$sentSomewhere = false;

// --- Telegram ---
if (!empty($config['telegram_token']) && !empty($config['telegram_chat_id'])) {
    $url = 'https://api.telegram.org/bot' . $config['telegram_token'] . '/sendMessage';
    $payload = http_build_query([
        'chat_id'    => $config['telegram_chat_id'],
        'text'       => $text,
        'parse_mode' => 'HTML',
    ]);
    $ch = curl_init($url);
    curl_setopt_array($ch, [
        CURLOPT_POST           => true,
        CURLOPT_POSTFIELDS     => $payload,
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_TIMEOUT        => 10,
    ]);
    $response = curl_exec($ch);
    $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
    curl_close($ch);
    if ($httpCode === 200) {
        $sentSomewhere = true;
    }
}

// --- дубль на почту ---
if (!empty($config['email'])) {
    $subject = '=?UTF-8?B?' . base64_encode('Заявка с сайта BF GROUP') . '?=';
    $body    = "Новая заявка с сайта bfgroup-ai.ru\n\n"
             . "Имя: $name\n"
             . "Контакт: $contact\n"
             . "Задача: $task\n"
             . ($source !== '' ? "Кнопка: $source\n" : '')
             . "Время: $when\n";
    $headers = "From: site@bfgroup-ai.ru\r\n"
             . "Content-Type: text/plain; charset=UTF-8\r\n";
    if (@mail($config['email'], $subject, $body, $headers)) {
        $sentSomewhere = true;
    }
}

// --- запасная копия на диск, чтобы заявка не пропала ни при каких сбоях ---
$logLine = $when . " | " . str_replace(["\n", "\r"], ' ', $name)
         . " | " . str_replace(["\n", "\r"], ' ', $contact)
         . " | " . str_replace(["\n", "\r"], ' ', $task)
         . " | " . $source . "\n";
@file_put_contents(__DIR__ . '/../leads.txt', $logLine, FILE_APPEND | LOCK_EX);

@touch($throttleFile);

if (!$sentSomewhere) {
    reply(false, 'Не удалось отправить заявку. Напишите нам в Telegram или на почту.');
}

reply(true);
