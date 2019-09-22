import pika
import json
from gif_generator import GifGenerator


def callback(ch, method, properties, body):
    worker = GifGenerator(json.loads(body))
    worker.generate()


def run_worker():
    connection = pika.BlockingConnection(pika.ConnectionParameters(host='mq'))
    channel = connection.channel()

    channel.queue_declare(queue='gif')
    channel.basic_consume(queue='gif', on_message_callback=callback, auto_ack=True)

    print(' [*] Waiting for messages. To exit press CTRL+C')

    channel.start_consuming()


if __name__ == "__main__":
    run_worker()

