function Register() {
  return (
    <main>
      <section>
        <h1>Create Account</h1>

        <form>
          <input
            type="text"
            placeholder="Full Name"
          />

          <input
            type="email"
            placeholder="Email"
          />

          <input
            type="password"
            placeholder="Password"
          />

          <button type="submit">
            Register
          </button>
        </form>

        <p>
          Already have an account?{" "}
          <a href="/login">Login</a>
        </p>
      </section>
    </main>
  );
}

export default Register;