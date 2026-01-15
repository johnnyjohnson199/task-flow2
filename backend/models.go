package main

type User struct {
	ID     string `json:"id"`
	Name   string `json:"name"`
	Avatar string `json:"avatar"`
	Email  string `json:"email"`
}

type Attachment struct {
	ID         string `json:"id"`
	Name       string `json:"name"`
	Size       string `json:"size"`
	Type       string `json:"type"`
	UploadedBy string `json:"uploadedBy"`
	UploadedAt string `json:"uploadedAt"`
}

type Comment struct {
	ID        string `json:"id"`
	User      User   `json:"user"`
	Text      string `json:"text"`
	CreatedAt string `json:"createdAt"`
	Likes     int    `json:"likes"`
}

type Task struct {
	ID           string       `json:"id"`
	Title        string       `json:"title"`
	Description  string       `json:"description,omitempty"`
	Status       string       `json:"status"`
	Priority     string       `json:"priority"`
	DueDate      string       `json:"dueDate"`
	Assignee     *User        `json:"assignee,omitempty"`
	Tags         []string     `json:"tags,omitempty"`
	Dependencies []string     `json:"dependencies,omitempty"`
	X            float64      `json:"x,omitempty"`
	Y            float64      `json:"y,omitempty"`
	Parent       string       `json:"parent,omitempty"`
	Attachments  []Attachment `json:"attachments,omitempty"`
	Comments     []Comment    `json:"comments,omitempty"`
}

type Notification struct {
	ID      string `json:"id"`
	Type    string `json:"type"`
	Title   string `json:"title"`
	Message string `json:"message"`
	Time    string `json:"time"`
	Read    bool   `json:"read"`
}
