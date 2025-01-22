const LoginForm = ({
  handleLogin,
  username,
  setUsername,
  password,
  setPassword,
}) => {
  return (
    <form onSubmit={handleLogin} id='login-form' className="card bg-base-200 w-full form-control">
      <div className="card-body">
        <label className="input input-bordered flex items-center gap-2">
          Username
          <input
            className="grow"
            type='text'
            value={username}
            name='username'
            onChange={({ target }) => setUsername(target.value)}
          />
        </label>
        <label className="input input-bordered flex items-center gap-2">
          password
          <input
            className="grow"
            type='password'
            value={password}
            name='username'
            onChange={({ target }) => setPassword(target.value)}
          />
        </label>
        <div className="card-actions justify-center">
          <button type='submit' className="btn btn-outline btn-primary btn-wide">login</button>
        </div>
      </div>
    </form>
  )
}

export default LoginForm
