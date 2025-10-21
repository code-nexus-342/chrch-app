# Events API Documentation

Complete API reference for ATG Chapel Events Management System

## Base URL
```
Local: http://localhost:5000
Production: https://your-domain.com
```

---

## 📅 Events Endpoints

### 1. Get All Events
**GET** `/api/events`

Get a list of all active events. Expired events are automatically filtered out.

**Query Parameters:**
| Parameter | Type | Description | Example |
|-----------|------|-------------|---------|
| type | string | Filter by event type | `?type=crusade` |
| status | string | Filter by status | `?status=upcoming` |
| featured | boolean | Filter featured events | `?featured=true` |

**Example Request:**
```bash
curl -X GET 'http://localhost:5000/api/events?featured=true'
```

**Success Response (200 OK):**
```json
[
  {
    "id": 1,
    "title": "Mutituni Market Crusade",
    "type": "Crusade",
    "date": "07-09 March, 2025",
    "event_datetime": "2025-03-07T14:00:00.000Z",
    "venue": "Mutituni Market",
    "host": "ATG Chapel Mks",
    "contact": "0714888066",
    "description": "Join us for a powerful three-day crusade...",
    "images": ["/assets/img/Events/Crusade.jpg"],
    "featured": true,
    "status": "upcoming",
    "created_at": "2025-10-19T10:30:00.000Z",
    "created_by": "admin@atgchapel.org",
    "updated_at": "2025-10-19T10:30:00.000Z"
  }
]
```

---

### 2. Get Single Event
**GET** `/api/events/:id`

Get detailed information about a specific event.

**URL Parameters:**
| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| id | integer | Yes | Event ID |

**Example Request:**
```bash
curl -X GET 'http://localhost:5000/api/events/1'
```

**Success Response (200 OK):**
```json
{
  "id": 1,
  "title": "Mutituni Market Crusade",
  "type": "Crusade",
  "date": "07-09 March, 2025",
  "event_datetime": "2025-03-07T14:00:00.000Z",
  "venue": "Mutituni Market",
  "host": "ATG Chapel Mks",
  "contact": "0714888066",
  "description": "Join us for a powerful three-day crusade...",
  "images": ["/assets/img/Events/Crusade.jpg"],
  "featured": true,
  "status": "upcoming",
  "created_at": "2025-10-19T10:30:00.000Z",
  "created_by": "admin@atgchapel.org",
  "updated_at": "2025-10-19T10:30:00.000Z"
}
```

**Error Response (404 Not Found):**
```json
{
  "message": "Event not found"
}
```

---

### 3. Create Event
**POST** `/api/events`

Create a new event. **Requires admin authorization.**

**Headers:**
```
Content-Type: application/json
```

**Request Body:**
| Field | Type | Required | Description |
|-------|------|----------|-------------|
| adminEmail | string | Yes | Authorized admin email |
| title | string | Yes | Event title |
| type | string | Yes | Event type |
| date | string | Yes | Human-readable date |
| event_datetime | string (ISO 8601) | Yes | Actual event datetime |
| venue | string | Yes | Event location |
| host | string | Yes | Event organizer |
| contact | string | Yes | Contact phone |
| description | string | Yes | Event description |
| images | array | No | Array of image URLs |
| featured | boolean | No | Featured flag (default: false) |
| status | string | No | Status (default: upcoming) |

**Example Request:**
```bash
curl -X POST 'http://localhost:5000/api/events' \
  -H 'Content-Type: application/json' \
  -d '{
    "adminEmail": "admin@atgchapel.org",
    "title": "Youth Conference 2025",
    "type": "Conference",
    "date": "15 March, 2025",
    "event_datetime": "2025-03-15T10:00:00",
    "venue": "ATG Chapel Hall",
    "host": "ATG Youth Ministry",
    "contact": "0714888066",
    "description": "A dynamic youth conference featuring inspiring speakers...",
    "images": [
      "/assets/img/Events/Youth1.jpg",
      "/assets/img/Events/Youth2.jpg"
    ],
    "featured": true,
    "status": "upcoming"
  }'
```

**Success Response (201 Created):**
```json
{
  "message": "Event created successfully",
  "event": {
    "id": 2,
    "title": "Youth Conference 2025",
    "type": "Conference",
    "date": "15 March, 2025",
    "event_datetime": "2025-03-15T10:00:00.000Z",
    "venue": "ATG Chapel Hall",
    "host": "ATG Youth Ministry",
    "contact": "0714888066",
    "description": "A dynamic youth conference...",
    "images": ["/assets/img/Events/Youth1.jpg", "/assets/img/Events/Youth2.jpg"],
    "featured": true,
    "status": "upcoming",
    "created_at": "2025-10-19T10:35:00.000Z",
    "created_by": "admin@atgchapel.org",
    "updated_at": "2025-10-19T10:35:00.000Z"
  }
}
```

**Error Responses:**

**401 Unauthorized:**
```json
{
  "message": "Admin email is required for this operation"
}
```

**403 Forbidden:**
```json
{
  "message": "Unauthorized: This email is not authorized to manage events"
}
```

**400 Bad Request:**
```json
{
  "message": "All required fields must be provided"
}
```

```json
{
  "message": "Event datetime cannot be in the past"
}
```

---

### 4. Update Event
**PUT** `/api/events/:id`

Update an existing event. **Requires admin authorization.**

**URL Parameters:**
| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| id | integer | Yes | Event ID |

**Headers:**
```
Content-Type: application/json
```

**Request Body:**
All fields are optional. Only include fields you want to update.

| Field | Type | Description |
|-------|------|-------------|
| adminEmail | string | **Required** - Admin email |
| title | string | Updated title |
| type | string | Updated type |
| date | string | Updated date string |
| event_datetime | string | Updated datetime |
| venue | string | Updated venue |
| host | string | Updated host |
| contact | string | Updated contact |
| description | string | Updated description |
| images | array | Updated images |
| featured | boolean | Updated featured flag |
| status | string | Updated status |

**Example Request:**
```bash
curl -X PUT 'http://localhost:5000/api/events/2' \
  -H 'Content-Type: application/json' \
  -d '{
    "adminEmail": "admin@atgchapel.org",
    "description": "Updated: A dynamic youth conference with amazing speakers and workshops!",
    "featured": true
  }'
```

**Success Response (200 OK):**
```json
{
  "message": "Event updated successfully",
  "event": {
    "id": 2,
    "title": "Youth Conference 2025",
    "type": "Conference",
    "date": "15 March, 2025",
    "event_datetime": "2025-03-15T10:00:00.000Z",
    "venue": "ATG Chapel Hall",
    "host": "ATG Youth Ministry",
    "contact": "0714888066",
    "description": "Updated: A dynamic youth conference with amazing speakers and workshops!",
    "images": ["/assets/img/Events/Youth1.jpg"],
    "featured": true,
    "status": "upcoming",
    "created_at": "2025-10-19T10:35:00.000Z",
    "created_by": "admin@atgchapel.org",
    "updated_at": "2025-10-19T11:00:00.000Z"
  }
}
```

**Error Responses:**

**404 Not Found:**
```json
{
  "message": "Event not found"
}
```

**400 Bad Request:**
```json
{
  "message": "No fields to update"
}
```

---

### 5. Delete Event
**DELETE** `/api/events/:id`

Delete an event. **Requires admin authorization.**

**URL Parameters:**
| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| id | integer | Yes | Event ID |

**Headers:**
```
Content-Type: application/json
```

**Request Body:**
| Field | Type | Required | Description |
|-------|------|----------|-------------|
| adminEmail | string | Yes | Admin email |

**Example Request:**
```bash
curl -X DELETE 'http://localhost:5000/api/events/2' \
  -H 'Content-Type: application/json' \
  -d '{
    "adminEmail": "admin@atgchapel.org"
  }'
```

**Success Response (200 OK):**
```json
{
  "message": "Event deleted successfully",
  "event": {
    "id": 2,
    "title": "Youth Conference 2025"
  }
}
```

**Error Response (404 Not Found):**
```json
{
  "message": "Event not found"
}
```

---

### 6. Manual Cleanup Expired Events
**POST** `/api/events/cleanup/expired`

Manually trigger cleanup of expired events. No authentication required.

**Example Request:**
```bash
curl -X POST 'http://localhost:5000/api/events/cleanup/expired'
```

**Success Response (200 OK):**
```json
{
  "message": "Cleanup completed",
  "deletedCount": 3
}
```

---

## 📧 Other Endpoints

### Newsletter Subscription
**POST** `/api/newsletter`

**Request Body:**
```json
{
  "email": "user@example.com"
}
```

### Prayer Request
**POST** `/api/prayer-request`

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "request": "Please pray for...",
  "isPublic": false
}
```

### Contact Form
**POST** `/api/contact`

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "subject": "Inquiry",
  "message": "I would like to know..."
}
```

### Health Check
**GET** `/api/health`

**Success Response:**
```json
{
  "status": "ok",
  "message": "ATG Chapel API is running"
}
```

---

## 🔒 Authentication

### Admin Authorization
Events management endpoints require admin email authorization:

1. **Email must be in database:**
   ```sql
   SELECT * FROM admin_users WHERE email = 'admin@atgchapel.org';
   ```

2. **Include in request:**
   - **Body:** `"adminEmail": "admin@atgchapel.org"`
   - **Header:** `X-Admin-Email: admin@atgchapel.org`

3. **Add new admin:**
   ```bash
   # Update ADMIN_EMAIL in .env
   pnpm run setup
   ```

---

## 📝 Event Type Values

Supported event types:
- `Crusade`
- `Conference`
- `Fellowship`
- `Special Service`
- Custom types are also supported

---

## 🕒 Date Format

**event_datetime** must be in ISO 8601 format:
```
Format: YYYY-MM-DDTHH:mm:ss
Example: 2025-03-15T14:00:00
```

**date** can be any human-readable format:
```
Examples:
- "15 March, 2025"
- "March 15-17, 2025"
- "Every Last Saturday"
```

---

## ⚡ Auto-Deletion

Events are automatically deleted when:
- `event_datetime` < current time
- Status is `upcoming`

**Cleanup runs:**
1. Every hour (cron job)
2. When fetching events list
3. Manual trigger via cleanup endpoint

---

## 🛠️ Error Codes

| Code | Description |
|------|-------------|
| 200 | Success |
| 201 | Created |
| 400 | Bad Request |
| 401 | Unauthorized |
| 403 | Forbidden |
| 404 | Not Found |
| 500 | Internal Server Error |

---

## 📊 Testing with Postman

1. **Import as Collection:**
   - Create new collection: "ATG Chapel API"
   - Add base URL variable: `{{base_url}}`
   - Set value: `http://localhost:5000`

2. **Create Environment:**
   - Variable: `admin_email`
   - Value: Your admin email

3. **Use in requests:**
   ```json
   {
     "adminEmail": "{{admin_email}}"
   }
   ```

---

## 📱 Frontend Integration

**React/JavaScript Example:**
```javascript
import apiService from '../services/api';

// Get all events
const events = await apiService.getEvents();

// Get filtered events
const crusades = await apiService.getEvents({ type: 'crusade' });

// Get single event
const event = await apiService.getEvent(1);

// Create event (admin)
const result = await apiService.createEvent(
  {
    title: "New Event",
    type: "Conference",
    // ... other fields
  },
  'admin@atgchapel.org'
);

// Update event (admin)
await apiService.updateEvent(
  1,
  { description: "Updated description" },
  'admin@atgchapel.org'
);

// Delete event (admin)
await apiService.deleteEvent(1, 'admin@atgchapel.org');
```

---

Built with ❤️ for ATG Chapel Machakos
