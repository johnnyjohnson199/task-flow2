package main

import (
	"encoding/json"
	"fmt"
	"math/rand"
	"net/http"
	"time"

	"github.com/gorilla/mux"
)

func GetTasks(w http.ResponseWriter, r *http.Request) {
	storeMutex.RLock()
	tasksCopy := make([]Task, len(tasks))
	copy(tasksCopy, tasks)
	storeMutex.RUnlock()

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(tasksCopy)
}

func CreateTask(w http.ResponseWriter, r *http.Request) {
	var task Task
	if err := json.NewDecoder(r.Body).Decode(&task); err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	task.ID = fmt.Sprintf("T-%d", rand.Intn(10000))
	if task.Status == "" {
		task.Status = "To Do"
	}
	if task.Priority == "" {
		task.Priority = "Medium"
	}
	if task.DueDate == "" {
		task.DueDate = time.Now().Format("2006-01-02")
	}

	storeMutex.Lock()
	tasks = append(tasks, task)
	storeMutex.Unlock()

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(task)
}

func UpdateTask(w http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)
	id := vars["id"]

	var updates map[string]interface{}
	if err := json.NewDecoder(r.Body).Decode(&updates); err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	var updatedTask Task
	found := false

	storeMutex.Lock()
	for i, task := range tasks {
		if task.ID == id {
			for k, v := range updates {
				switch k {
				case "title":
					if s, ok := v.(string); ok { tasks[i].Title = s }
				case "description":
					if s, ok := v.(string); ok { tasks[i].Description = s }
				case "status":
					if s, ok := v.(string); ok { tasks[i].Status = s }
				case "priority":
					if s, ok := v.(string); ok { tasks[i].Priority = s }
				case "dueDate":
					if s, ok := v.(string); ok { tasks[i].DueDate = s }
				case "x":
					if n, ok := v.(float64); ok { tasks[i].X = n }
				case "y":
					if n, ok := v.(float64); ok { tasks[i].Y = n }
				}
			}
			updatedTask = tasks[i]
			found = true
			break
		}
	}
	storeMutex.Unlock()

	if !found {
		http.Error(w, "Task not found", http.StatusNotFound)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(updatedTask)
}

func GetCurrentUser(w http.ResponseWriter, r *http.Request) {
	storeMutex.RLock()
	user := currentUser
	storeMutex.RUnlock()

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(user)
}

func GetNotifications(w http.ResponseWriter, r *http.Request) {
	storeMutex.RLock()
	notifsCopy := make([]Notification, len(notifications))
	copy(notifsCopy, notifications)
	storeMutex.RUnlock()

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(notifsCopy)
}
