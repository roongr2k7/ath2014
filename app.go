package main

import (
	"./lib"
	"log"
	"net/http"
)

func main() {
	http.HandleFunc("/api/topics", topics)
  //http.Handle("/static/", http.StripPrefix("/static/", http.FileServer(http.Dir("./static/"))))
  http.Handle("/", http.FileServer(http.Dir("./webroot")))
  http.HandleFunc("/topic/", serveIndex)
	log.Println("Listening...")
	err := http.ListenAndServe(":3000", nil)
	if err != nil {
		panic(err.Error())
	}
}

func serveIndex(w http.ResponseWriter, r *http.Request) {
  http.ServeFile(w, r, "./webroot/index.html")
}

func topics(w http.ResponseWriter, r *http.Request) {
	controller := lib.Controller{}
	w.Write(controller.GetTopics())
}
