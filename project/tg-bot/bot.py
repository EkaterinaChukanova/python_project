from dotenv import load_dotenv
from telebot.types import ReplyKeyboardMarkup, KeyboardButton, ReactionTypeEmoji
import settings
import telebot
import os

env_file = os.environ.get('ENVIRONMENT_FILE', '.env.local')
dotenv_path = settings.BASE_DIR / env_file
load_dotenv(dotenv_path)

TOKEN = os.environ.get("TG_TOKEN")
ADMIN_ID = os.environ.get("ADMIN_ID")
bot = telebot.TeleBot(TOKEN, parse_mode=None)


@bot.message_handler(commands=['start'])
def send_welcome(message):
    bot.reply_to(message, 'Дароу')


@bot.message_handler()
def text_handler(message):
    pass


if __name__ == "__main__":
    print("Бот запущен...")

    # bot.add_edited_message_handler({
    #     'callback': handle_edited_message,
    # })
    bot.polling(none_stop=True)
