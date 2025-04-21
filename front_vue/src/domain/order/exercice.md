# Exercise List — ORDER API Frontend (Vue 3 + Pinia + Axios + TS + Jest)

## 1️⃣ Project Structure Setup

Create a clean frontend project structure:

* `/src`
	+ `/api` → API service handlers
	+ `/stores` → Pinia stores
	+ `/views` → Page-level components
	+ `/components` → Reusable UI components
	+ `/models` → TypeScript interfaces/types
	+ `/tests` → Jest unit tests

Add `vite.config.ts`, `tsconfig.json`, and configure alias paths (like `@/api`, `@/stores`).

## 2️⃣ Define TypeScript Models

Create a `models/Order.ts` with the following:

* `Order` interface for API data
* `OrderStatus` enum for status validation

✅ Clean code tip: Keep type definitions decoupled from components.

## 3️⃣ Axios Service Layer

Create `api/orderService.ts`

* Define `getOrders`, `getOrderById`, `createOrder`, `updateOrder`, `deleteOrder`
* Configure Axios instance with `baseURL` and interceptors (if needed)
* Handle API errors with clean centralized error handling

✅ Clean code tip: No direct API calls inside components.

## 4️⃣ Pinia Store for Orders

Create `stores/orderStore.ts`

* Define `orders`, `selectedOrder`, `isLoading`, `error` states
* Create `fetchOrders`, `fetchOrderById`, `addOrder`, `updateOrder`, `removeOrder` actions
* Use `defineStore` and `reactive/ref` for state
* Handle optimistic updates and state syncing

✅ Clean code tip: Isolate business logic in stores.

## 5️⃣ Views and Components

Views:

* `views/OrderListView.vue`
* `views/OrderDetailView.vue`
* `views/OrderFormView.vue`

Components:

* `components/OrderTable.vue`
* `components/OrderForm.vue`

✅ Clean code tip: Keep views thin, delegate logic to stores.

## 6️⃣ Composition API Patterns

Use `<script setup lang="ts">`

* Extract reusable logic into composables
	+ `composables/useOrder.ts`
	+ Example: form validation, default values, local UI states

✅ Clean code tip: No duplicated logic in multiple components.

## 7️⃣ Unit Testing with Jest

Write unit tests for:

* `api/orderService` → Mock Axios, test success/error cases
* `stores/orderStore` → Mock API calls, test actions/mutations
* `components/OrderTable` and `OrderForm` → Test props, events, rendering

Use `jest.mock()` and `axios-mock-adapter` for mocking

✅ Clean code tip: Keep tests close to the tested files (like `/tests/api/orderService.spec.ts`)

## 8️⃣ Error Handling and Notifications

Implement global error handling in the Axios instance

* Show user-friendly error/success messages via a notification system

✅ Clean code tip: No `alert()` calls — use a central notification composable or store.

## 9️⃣ Form Validation

Use `yup` or `vee-validate` with TypeScript for:

* `name`: required string
* `price`: positive number
* `status`: valid `OrderStatus` enum
* `user/product`: required string

✅ Clean code tip: Validation schema separated from components.

## 🔟 Bonus: Pagination, Sorting, Filtering

Add pagination, sorting, and filtering support in:

* `OrderListView.vue`
* `orderService.ts`
* `orderStore.ts`

Handle query parameters cleanly with a helper or composable.


# Detailed Instructions: Views & Components

## 📁 Project Structure (Focused View)

```
/src
├── views/
│   ├── OrderListView.vue
│   ├── OrderDetailView.vue
│   └── OrderFormView.vue
├── components/
│   ├── OrderTable.vue
│   ├── OrderForm.vue
│   └── OrderStatusBadge.vue
```

### 1️⃣ OrderListView.vue

**Purpose:**  
Display a list of all orders, with options to view, edit, delete, and create orders.

**Instructions:**

- Import and use `OrderTable.vue` here.
- Fetch data from the `orderStore`.
- Use `onMounted()` to load orders when the view is mounted.
- Handle navigation (using vue-router) to `OrderDetailView` and `OrderFormView`.
- Show loading and error states with clean UI feedback.

**Key Composition API techniques:**

```typescript
const orderStore = useOrderStore();
onMounted(() => orderStore.fetchOrders());
```

**Template:**

```vue
<OrderTable
  :orders="orderStore.orders"
  @view="goToDetail"
  @edit="goToEdit"
  @delete="deleteOrder"
/>
```

### 2️⃣ OrderDetailView.vue

**Purpose:**  
Display detailed information about a specific order.

**Instructions:**

- Get the `orderId` from `vue-router` params.
- Use `orderStore.fetchOrderById(orderId)` to load order data.
- Display the order details cleanly, with badges for status.
- Provide a back button to return to the list.
- Use a small component like `OrderStatusBadge.vue` to visually represent order status (color coded).

**Key Composition API techniques:**

```typescript
const route = useRoute();
const orderStore = useOrderStore();
onMounted(() => orderStore.fetchOrderById(route.params.id as string));
```

### 3️⃣ OrderFormView.vue

**Purpose:**  
Handle both create and edit operations for an order.

**Instructions:**

- Use the same `OrderForm.vue` component for both cases.
- Detect if it's a create or edit form via `vue-router` param (id).
- On submit event:
  - Call `orderStore.addOrder` if creating.
  - Call `orderStore.updateOrder` if editing.
- Handle success/error states via notifications.

**Key Composition API techniques:**

```typescript
const isEditing = computed(() => !!route.params.id);
const handleSubmit = (formData: Order) => {
  isEditing.value
    ? orderStore.updateOrder(formData)
    : orderStore.addOrder(formData);
};
```

**Template:**

```vue
<OrderForm
  :order="currentOrder"
  :is-editing="isEditing"
  @submit="handleSubmit"
/>
```

### 4️⃣ OrderTable.vue

**Purpose:**  
Reusable table component to display order data with actions.

**Instructions:**

- Accept orders as a Prop.
- Emit view, edit, and delete events when buttons are clicked.
- Use `OrderStatusBadge.vue` inside the table to display statuses.
- Add optional props for pagination and sorting (as a bonus extension).

**Props:**

```typescript
defineProps<{
  orders: Order[];
}>();
```

**Emits:**

```typescript
defineEmits(['view', 'edit', 'delete']);
```

**Template:**

```vue
<tr v-for="order in orders" :key="order.id">
  <td>{{ order.name }}</td>
  <td>{{ order.price }}</td>
  <td><OrderStatusBadge :status="order.status"/></td>
  <td>
    <button @click="$emit('view', order.id)">View</button>
    <button @click="$emit('edit', order.id)">Edit</button>
    <button @click="$emit('delete', order.id)">Delete</button>
  </td>
</tr>
```

### 5️⃣ OrderForm.vue

**Purpose:**  
Reusable form component for order creation and editing.

**Instructions:**

- Accept order object and isEditing as props.
- Use controlled inputs bound to a local ref object.
- Validate inputs before emitting submit.
- Emit submit event with the form data when the form is submitted.
- Display errors inline or with a validation message system.

**Props:**

```typescript
defineProps<{
  order?: Order;
  isEditing: boolean;
}>();
```

**Emits:**

```typescript
defineEmits(['submit']);
```

**Template:**

```vue
<form @submit.prevent="submitForm">
  <input v-model="form.name" required />
  <input v-model="form.price" type="number" required />
  <select v-model="form.status">
    <option value="PENDING">Pending</option>
    <option value="COMPLETED">Completed</option>
  </select>
  <input v-model="form.user_" required />
  <input v-model="form.product" required />
  <button type="submit">{{ isEditing ? 'Update' : 'Create' }}</button>
</form>
```

### 6️⃣ OrderStatusBadge.vue

**Purpose:**  
Display order status with a colored badge.

**Instructions:**

- Accept status as a prop.
- Render a badge with a different color depending on the status.

**Example:**

- Pending → Yellow
- Completed → Green
- Cancelled → Red

**Props:**

```typescript
defineProps<{
  status: string;
}>();
```

**Template:**

```vue
<span :class="badgeClass">{{ status }}</span>
```

**Computed Class:**

```typescript
const badgeClass = computed(() => {
  switch (props.status) {
    case 'COMPLETED': return 'bg-green-500 text-white';
    case 'PENDING': return 'bg-yellow-500 text-black';
    default: return 'bg-gray-500 text-white';
  }
});
```

### ✅ Final Notes

- **Views:** Handle routing, lifecycle, page layout.
- **Components:** Reusable, testable, presentation-only — no direct API calls.
- **Props/Events:** Parent-to-child data flow, child-to-parent event communication.
- **Pinia Store:** Business logic and state management.
- **Composables:** Extract reusable logic when needed (like pagination, sorting, validation).