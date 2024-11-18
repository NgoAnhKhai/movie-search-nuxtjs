<template>
  <v-container max-width="400px" class="mt-12">
    <h2 class="text-h5 mb-4 center-title">Đăng Nhập</h2>
    <v-form v-model="valid" @submit.prevent="login">
      <!-- Email Field -->
      <v-text-field
        v-model="email"
        label="Email"
        :rules="[rules.required, rules.email]"
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

      <!-- Forgot Password and Login Button -->
      <div class="actions-row">
        <a @click="forgotPassword" class="forgot-password">Quên mật khẩu?</a>
        <v-btn type="submit" class="custom-login-btn" :disabled="!valid">
          Đăng Nhập
        </v-btn>
      </div>

      <!-- Register Link -->
      <div class="register-link mt-4">
        <p>
          Nếu bạn chưa có tài khoản,
          <a @click="goToRegister" class="custom-link">hãy đăng ký</a>.
        </p>
        <!-- Error Message for Incorrect Login -->
        <p v-if="loginError" class="error--text">
          Thông tin đăng nhập không đúng! Nếu bạn chưa có tài khoản,
          <a @click="goToRegister" class="custom-link">hãy đăng ký tài khoản</a
          >.
        </p>
      </div>
    </v-form>
  </v-container>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "~/store/authStore";

const router = useRouter();
const authStore = useAuthStore();
const valid = ref(false);
const email = ref("");
const password = ref("");
const showPassword = ref(false);
const loginError = ref(false);

// Validation rules
const rules = {
  required: (value: string) => !!value || "Trường này là bắt buộc",
  email: (value: string) => /.+@.+\..+/.test(value) || "Email không hợp lệ",
};

// Toggle password visibility
function togglePassword() {
  showPassword.value = !showPassword.value;
}

// Login function
function login() {
  const storedUser = JSON.parse(sessionStorage.getItem("user") || "{}");

  if (
    storedUser.email === email.value &&
    storedUser.password === password.value
  ) {
    loginError.value = false;
    authStore.login(email.value); // Gọi hàm login trong authStore
    router.push("/");
  } else {
    loginError.value = true;
  }
}

// Navigate to Register Page
function goToRegister() {
  router.push("/registerPage");
}

// Forgot Password handler
function forgotPassword() {
  alert("Chức năng Quên mật khẩu chưa được triển khai.");
}
</script>

<style scoped>
.custom-login-btn {
  background-color: #e63946; /* Màu đỏ như trong giao diện */
  color: white; /* Màu chữ */
  font-weight: bold; /* Tạo cảm giác chắc chắn */
  padding: 10px 20px; /* Tăng kích thước nút */
  border-radius: 4px; /* Bo góc */
  transition: background-color 0.3s ease; /* Hiệu ứng chuyển đổi màu */
}

.custom-login-btn:hover {
  background-color: #d62839; /* Màu đậm hơn khi hover */
}

.custom-login-btn:disabled {
  background-color: #bdbdbd; /* Màu xám khi bị vô hiệu hóa */
  color: #757575; /* Màu chữ xám nhạt */
}
.center-title {
  text-align: center;
}
.actions-row {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 8px;
  position: relative;
}
.error--text {
  color: red;
  font-size: 0.9rem;
}

.forgot-password {
  font-size: 0.8rem;
  position: absolute;
  left: 0;
  cursor: pointer;
  text-decoration: none;
}
.forgot-password:hover {
  color: #1976d2; /* Màu xanh khi hover */
}

.register-link {
  text-align: center;
}

.custom-link {
  display: inline-block;
  padding: 4px 8px;
  border-radius: 4px;
  color: #ffffff; /* Màu chữ trắng */
  background-color: #424242; /* Màu nền tối hơn */
  transition: background-color 0.3s ease, color 0.3s ease;
  cursor: pointer;
}

.custom-link:hover {
  background-color: #303030; /* Màu nền tối hơn khi hover */
  color: #ffffff; /* Giữ màu chữ trắng khi hover */
}
</style>
