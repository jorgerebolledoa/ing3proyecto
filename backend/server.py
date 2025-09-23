from flask import Flask, request, jsonify
from flask_cors import CORS
from generate_graph import generate_graph

app = Flask(__name__)
CORS(app, resources={r"/api/*": {"origins": "http://localhost:5173"}})

@app.route('/api/generate-graph', methods=['POST'])
def handle_generate_graph():
    data = request.get_json()
    start_date = data.get('startDate')
    end_date = data.get('endDate')

    result = generate_graph(start_date, end_date)

    if result["status"] == "success":
        return jsonify(result), 200
    else:
        return jsonify(result), 500

if __name__ == '__main__':
    app.run(debug=True, port=5000)