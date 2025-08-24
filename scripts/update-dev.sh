#!/bin/bash

# Скрипт для получения обновлений из dev-agent subtree
# ВНИМАНИЕ: Этот скрипт только получает обновления, не отправляет коммиты в dev-agent

echo "🔄 Получение обновлений из dev-agent..."

# Получаем последние изменения из dev-agent
git subtree pull --prefix=dev https://github.com/GTFB/dev-agent.git main --squash

echo "✅ Обновления получены успешно!"
echo "📝 Теперь можно создать коммит с обновлениями:"
echo "   git add ."
echo "   git commit -m 'Update dev-agent subtree'"
echo ""
echo "⚠️  ВАЖНО: Не используйте git subtree push для отправки изменений в dev-agent!"
echo "   Все изменения должны идти через issues и pull requests в dev-agent репозитории."
