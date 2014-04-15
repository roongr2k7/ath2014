package main

import (
	"github.com/varokas/ath2014/lib"
	"log"
	"net/http"
)

func main() {
	http.HandleFunc("/topics", topics)
	http.Handle("/", http.FileServer(http.Dir("./static")))

	log.Println("Listening...")
	err := http.ListenAndServe(":3000", nil)
	if err != nil {
		panic(err.Error())
	}
}

func topics(w http.ResponseWriter, r *http.Request) {
	controller := lib.Controller{}
	w.Write(controller.GetTopics())
}
