package main

import (
	"log"
	"net/http"

	"github.com/gorilla/mux"
	"github.com/rs/cors"
)

func main() {
	InitStore()

	r := mux.NewRouter()
	api := r.PathPrefix("/api/v1").Subrouter()

	api.HandleFunc("/tasks", GetTasks).Methods("GET")
	api.HandleFunc("/tasks", CreateTask).Methods("POST")
	api.HandleFunc("/tasks/{id}", UpdateTask).Methods("PUT", "PATCH")
	api.HandleFunc("/users/me", GetCurrentUser).Methods("GET")
	api.HandleFunc("/notifications", GetNotifications).Methods("GET")

	// Setup CORS
	c := cors.New(cors.Options{
		AllowedOrigins:   []string{"http://localhost:5173", "http://localhost:3000"}, // Allow common frontend ports
		AllowedMethods:   []string{"GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"},
		AllowedHeaders:   []string{"Content-Type", "Authorization"},
		AllowCredentials: true,
	})

	handler := c.Handler(r)

	log.Println("Server starting on port 8080...")
	if err := http.ListenAndServe(":8080", handler); err != nil {
		log.Fatal(err)
	}
}
