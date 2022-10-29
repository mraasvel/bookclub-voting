import csv
import json

def make_book(name, author, link):
	return {
		"name": name,
		"author": author,
		"link": link,
	}

with open('books.csv', 'r') as f:
	reader = csv.reader(f)
	books = []
	for row in reader:
		book = make_book(row[0], row[1], row[2])
		books.append(book)

def make_link(link):
	return '<a href="%s" target="_blank">Goodreads Link</a>' % link

def make_markdown(book):
	link = make_link(book['link'])
	return "### Author: %s\n\n%s\n" % (book['author'], link)

def make_question(book):
	return {
		"type": "LinearScale",
		"linearScale": {
			"title": book["name"],
			"description": make_markdown(book),
			"rangeStart": 0,
			"rangeEnd": 5,
		}
	}

json_object = {
	"name": "Book Club Vote - November 2022",
	"questions": [ make_question(book) for book in books ]
}

json_object = json.dumps(json_object, indent = 4) 
print(json_object)
