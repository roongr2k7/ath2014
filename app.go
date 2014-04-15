package main

import (
  "github.com/gorilla/mux"
  "log"
  "net/http"
  "./lib"
)


func main() {
  rtr := mux.NewRouter()
  rtr.HandleFunc("/topics", topics)
  rtr.PathPrefix("/").Handler(http.FileServer(http.Dir("./static/")))
  http.Handle("/", rtr)

  log.Println("Listening...")
  http.ListenAndServe(":3000", nil)
}

func topics(w http.ResponseWriter, r *http.Request) {
  controller := lib.Controller{}
  w.Write(controller.GetTopics())
}
