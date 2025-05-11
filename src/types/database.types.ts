// Автоматически сгенерированно 2025-05-11T07:28:40.647Z
export type Database = {
  public: {
    Tables: {
  "profiles": {
    "required": [
      "id"
    ],
    "properties": {
      "id": {
        "description": "Note:\nThis is a Primary Key.<pk/>",
        "format": "uuid",
        "type": "string"
      },
      "is_admin": {
        "default": false,
        "format": "boolean",
        "type": "boolean"
      }
    },
    "type": "object"
  },
  "topics": {
    "required": [
      "id",
      "title"
    ],
    "properties": {
      "id": {
        "description": "Note:\nThis is a Primary Key.<pk/>",
        "format": "integer",
        "type": "integer"
      },
      "section_id": {
        "description": "Note:\nThis is a Foreign Key to `sections.id`.<fk table='sections' column='id'/>",
        "format": "integer",
        "type": "integer"
      },
      "title": {
        "format": "text",
        "type": "string"
      },
      "content": {
        "format": "jsonb"
      },
      "video_url": {
        "format": "text",
        "type": "string"
      }
    },
    "type": "object"
  },
  "sections": {
    "required": [
      "id",
      "title"
    ],
    "properties": {
      "id": {
        "description": "Note:\nThis is a Primary Key.<pk/>",
        "format": "integer",
        "type": "integer"
      },
      "title": {
        "format": "text",
        "type": "string"
      },
      "slug": {
        "format": "text",
        "type": "string"
      },
      "cover_url": {
        "format": "text",
        "type": "string"
      }
    },
    "type": "object"
  }
}
  }
}