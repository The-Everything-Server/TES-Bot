import sqlite3

class Database():
    def __init__(self, file):
        self.conn = sqlite3.connect(file)
        self.cursor = self.conn.cursor()

    def execute(self, query, *args):
        result = self.cursor.execute(query, args)
        self.conn.commit()
        fetched_result = result.fetchall()
        return fetched_result