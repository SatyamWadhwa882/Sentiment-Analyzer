from flask import Flask, request, jsonify
from flask_cors import CORS
from nltk.sentiment.vader import SentimentIntensityAnalyzer
import nltk

# Download the VADER lexicon
nltk.download('vader_lexicon')

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# Initialize the sentiment analyzer
sia = SentimentIntensityAnalyzer()

@app.route('/analyze', methods=['POST'])
def analyze():
    data = request.get_json()
    text = data.get('text')
    if text:
        sentiment = sia.polarity_scores(text)
        return jsonify(sentiment)
    return jsonify({'error': 'No text provided'}), 400

if __name__ == '__main__':
    app.run(debug=True)
