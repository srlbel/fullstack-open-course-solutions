If we were to work on a Rust codebase for a backend server built on top of Actix, we can do the steps of `lint`, `build` and `test` using the built-in tool of `cargo`. This allow of to run tests flagged into the code by using the command `cargo test` or `cargo test <test>` for an specific test as stated at the [rust docs](https://doc.rust-lang.org/cargo/guide/tests.html). meanwhile, for the `lint` process you can use the `cargo check` command that allows you to, as stated at the [rust docs](https://doc.rust-lang.org/cargo/guide/tests.html):

> Check a local package and all of its dependencies for errors. This will essentially compile the packages without performing the final step of code generation, which is faster than running `cargo build`. The compiler will save metadata files to disk so that future runs will reuse them if the source has not been modified. Some diagnostics and errors are only emitted during code generation, so they inherently won’t be reported with `cargo check`.

also, you can use in your codebase [clippy](https://github.com/rust-lang/rust-clippy) for a more comprehensive lint process. 

And finally, we can use `cargo build` to build an executable. Since we used `cargo check` before, the process of building would be a little bit faster.

As for the environment to run the process, I would recommend using a local server of [gitea](https://about.gitea.com/).  This is a consideration since `gitea` is compatible with GitHub Actions and the build process of rust *may* take a while to finish. This is a problem if we were using a cloud based solutions that take in consideration *build time*. 

In order to make deploy it we can either:
1. Use a local instance of `Coolify`.
2. Mirror the `gitea` repo into a github repo that later on is sent to a cloud based solution.
