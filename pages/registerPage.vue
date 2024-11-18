<!-- RegisterPage.vue -->
<template>
  <v-container max-width="400px" class="mt-12">
    <h2 class="text-h5 mb-4">Đăng Ký Tài Khoản</h2>
    <v-form v-model="valid" @submit.prevent="register">
      <!-- Email Field -->
      <v-text-field
        v-model="email"
        label="Email"
        :rules="[rules.required, rules.email]"
        required
      ></v-text-field>

      <!-- Username Field -->
      <v-text-field
        v-model="username"
        label="Tên đăng nhập"
        :rules="[rules.required]"
        required
      ></v-text-field>

      <!-- Phone Number Field -->
      <v-text-field
        v-model="phoneNumber"
        label="Số điện thoại"
        :rules="[rules.required, rules.phone]"
        required
      ></v-text-field>

      <!-- Address Field -->
      <v-text-field
        v-model="address"
        label="Địa chỉ"
        :rules="[rules.required]"
        required
      ></v-text-field>

      <!-- Password Field -->
      <v-text-field
        v-model="password"
        label="Mật khẩu"
        :type="showPassword ? 'text' : 'password'"
        :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
        @click:append="togglePassword"
        :rules="[rules.required]"
        required
      ></v-text-field>

      <!-- Confirm Password Field -->
      <v-text-field
        v-model="confirmPassword"
        label="Xác nhận mật khẩu"
        :type="showPassword ? 'text' : 'password'"
        :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
        @click:append="toggleConfirmPassword"
        :rules="[rules.required, matchPassword]"
        required
      ></v-text-field>

      <!-- Success Message -->
      <p v-if="registrationSuccess" class="success--text">
        Đăng Ký Thành Công, vui lòng đợi trong giây lát. Chúng tôi sẽ chuyển
        sang trang đăng nhập
      </p>

      <!-- Register Button -->
      <v-btn
        type="submit"
        class="mt-4 custom-register-btn"
        :disabled="!valid || registrationSuccess"
      >
        Đăng Ký
      </v-btn>
    </v-form>
  </v-container>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
const valid = ref(false);
const email = ref("");
const username = ref("");
const phoneNumber = ref("");
const address = ref("");
const password = ref("");
const confirmPassword = ref("");
const showPassword = ref(false);
const showConfirmPassword = ref(false);
const passwordMismatch = ref(false);
const registrationSuccess = ref(false); // Track registration success

// Validation rules
const rules = {
  required: (value: string) => !!value || "Trường này là bắt buộc",
  email: (value: string) => /.+@.+\..+/.test(value) || "Email không hợp lệ",
  phone: (value: string) =>
    /^\d{10,11}$/.test(value) || "Số điện thoại không hợp lệ",
};

// Toggle password visibility
function togglePassword() {
  showPassword.value = !showPassword.value;
}

function toggleConfirmPassword() {
  showConfirmPassword.value = !showConfirmPassword.value;
}

// Check if confirmPassword matches password
const matchPassword = (value: string) => {
  passwordMismatch.value = value !== password.value;
  return !passwordMismatch.value || "Mật khẩu không khớp";
};

// Register function
function register() {
  if (passwordMismatch.value) {
    return;
  }

  // Lưu thông tin user vào sessionStorage
  const userInfo = {
    email: email.value,
    username: username.value,
    phoneNumber: phoneNumber.value,
    address: address.value,
    password: password.value,
  };
  sessionStorage.setItem("user", JSON.stringify(userInfo));

  // Set registration success to true and show success message
  registrationSuccess.value = true;

  // Simulate a delay before redirecting to login page
  setTimeout(() => {
    router.push("/loginPage");
  }, 3000); // 3-second delay before redirecting
}
</script>

<style scoped>
.custom-register-btn {
  background-color: #e63946;
  color: white;
  font-weight: bold;
  padding: 10px 20px;
  border-radius: 8px;
  transition: background-color 0.3s ease, box-shadow 0.3s ease;
}

.custom-register-btn:hover {
  background-color: #d62839;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.2);
}

.custom-register-btn:disabled {
  background-color: #bdbdbd;
  color: #757575;
  cursor: not-allowed;
}

.error--text {
  color: red;
  font-size: 0.9rem;
}

.success--text {
  color: #28a745; /* Màu xanh lục đậm */
  font-size: 0.9rem;
  margin-top: 10px;
}
</style>
