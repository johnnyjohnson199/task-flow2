package main

import "sync"

var (
	tasks         []Task
	currentUser   User
	notifications []Notification
	storeMutex    sync.RWMutex
)

func InitStore() {
	currentUser = User{
		ID:     "u1",
		Name:   "Jane Doe",
		Email:  "jane@taskflow.com",
		Avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuBzZP_JQ_P8ULlZMUTJarvOz3IsB0CXDAVLpH5rD6wX3zO8D9SaLwAYT9CpWomxAu-8SxD_3MPUe2ZcSdu4e9qw8iHnCLLMR92UzTJOV7dBRh7JX77cvHeU9txkW6fe77F18iQ_vPS0oRkAc2uq_q0dtdHjZAiMxQ7IOQT6maX-D5wfHQvq56Hqpr9QXRW2XDyTYq735WWuLqmqU9XTCP5f9SAFQOzxWcjzc1j4HpghgVyWgj3ROo3hHrxTkhGLJNRYFdsNZeJNhS4",
	}

	tasks = []Task{
		{
			ID:          "T-101",
			Title:       "Design System Update",
			Description: "Update color tokens and typography scale for dark mode consistency.",
			Status:      "Done",
			Priority:    "High",
			DueDate:     "2023-10-24",
			X:           130,
			Y:           240,
			Tags:        []string{"Design"},
		},
		{
			ID:          "T-104",
			Title:       "Implement UI Components",
			Description: "Build the new Card and Sidebar components using Tailwind.",
			Status:      "In Progress",
			Priority:    "Medium",
			DueDate:     "2023-10-28",
			X:           650,
			Y:           80,
			Dependencies: []string{"T-101"},
			Tags:        []string{"Frontend"},
		},
		{
			ID:          "T-106",
			Title:       "Content Migration",
			Description: "Move blog posts from legacy CMS to new platform.",
			Status:      "To Do",
			Priority:    "Low",
			DueDate:     "2023-11-02",
			X:           650,
			Y:           400,
			Dependencies: []string{"T-101"},
			Tags:        []string{"Content"},
		},
		{
			ID:          "T-109",
			Title:       "QA Testing",
			Description: "Verify component responsiveness and dark mode compatibility.",
			Status:      "Blocked",
			Priority:    "High",
			DueDate:     "2023-10-29",
			X:           1150,
			Y:           220,
			Dependencies: []string{"T-104"},
			Tags:        []string{"QA"},
		},
		{
			ID:          "PHX-402",
			Title:       "Implement real-time collaboration engine for document editor",
			Description: "We need to integrate a robust Yjs-based collaboration engine to handle concurrent edits.",
			Status:      "In Progress",
			Priority:    "High",
			DueDate:     "2023-10-24",
			Dependencies: []string{"PHX-398"},
			Attachments: []Attachment{
				{ID: "f1", Name: "Architecture_Spec_v2.pdf", Size: "2.4 MB", Type: "pdf", UploadedBy: "Sarah Chen", UploadedAt: "Oct 23, 10:42 AM"},
				{ID: "f2", Name: "UI_Mockups_Collab.png", Size: "1.8 MB", Type: "image", UploadedBy: "Marcus Wright", UploadedAt: "Oct 22, 4:15 PM"},
				{ID: "f3", Name: "websocket_config.json", Size: "12 KB", Type: "code", UploadedBy: "Sarah Chen", UploadedAt: "Oct 22, 11:20 AM"},
			},
			Comments: []Comment{
				{ID: "c1", User: User{ID: "u2", Name: "Sarah Chen"}, Text: "I've verified the WebSocket provider fallback. It works well on cellular networks.", CreatedAt: "2 hours ago", Likes: 2},
				{ID: "c2", User: User{ID: "u3", Name: "Marcus Wright"}, Text: "Yes, Sarah. Let's add that to the Child Tasks list for tracking.", CreatedAt: "1 hour ago", Likes: 0},
			},
		},
	}

	notifications = []Notification{
		{
			ID:      "n1",
			Type:    "status",
			Title:   "Task Status Updated",
			Message: "Sarah Jenkins moved \"Q3 Marketing Strategy\" to In Review.",
			Time:    "2m ago",
			Read:    false,
		},
		{
			ID:      "n2",
			Type:    "file",
			Title:   "New File Attached",
			Message: "Mike Ross attached design_v3.fig to \"Homepage Redesign\".",
			Time:    "15m ago",
			Read:    false,
		},
		{
			ID:      "n3",
			Type:    "deadline",
			Title:   "Deadline Approaching",
			Message: "The deadline for \"Backend Migration\" is tomorrow at 5:00 PM.",
			Time:    "1h ago",
			Read:    false,
		},
		{
			ID:      "n4",
			Type:    "comment",
			Title:   "New Comment",
			Message: "Elena Fisher commented: \"Looks great, let's ship it!\"",
			Time:    "3h ago",
			Read:    true,
		},
	}
}
