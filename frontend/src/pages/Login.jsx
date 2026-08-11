function Login() {
  return (
    <main>
      <section>
        <h1>Login</h1>

        <form>
          <input
            type="email"
            placeholder="Email"
          />

          <input
            type="password"
            placeholder="Password"
          />

          <button type="submit">
            Login
          </button>
        </form>

        <p>
          Don't have an account?{" "}
          <a href="/register">Register</a>
        </p>
      </section>
    </main>
  );
}

export default Login;