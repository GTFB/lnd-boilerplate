### **Protocol: Integrating and Updating a Project from the Upstream Boilerplate**

This protocol outlines how to merge the `lnd-boilerplate` into an existing client project and how to pull future updates from it.

#### **Part 1: Initial Setup (Do this only ONCE per project)**

This procedure merges the boilerplate into your client project for the first time.

1.  **Clone Your Client Project**
    Clone your project's repository to your local machine and navigate into the directory.
    ```bash
    git clone https://github.com/<YOUR_USERNAME>/<CLIENT_PROJECT_NAME>.git
    cd <CLIENT_PROJECT_NAME>
    ```

2.  **Add the Boilerplate as an `upstream` Remote**
    Link the boilerplate repository. We name it `upstream` by convention.
    ```bash
    git remote add upstream https://github.com/GTFB/lnd-boilerplate.git
    ```

3.  **Verify the Remotes**
    Check that both `origin` (your project) and `upstream` (the boilerplate) are configured correctly.
    ```bash
    git remote -v
    # Expected output:
    # origin    https://github.com/<YOUR_USERNAME>/<CLIENT_PROJECT_NAME>.git (fetch)
    # origin    https://github.com/<YOUR_USERNAME>/<CLIENT_PROJECT_NAME>.git (push)
    # upstream  https://github.com/GTFB/lnd-boilerplate.git (fetch)
    # upstream  https://github.com/GTFB/lnd-boilerplate.git (push)
    ```

4.  **Fetch the Boilerplate Code**
    Download the contents and history from the `upstream` repository.
    ```bash
    git fetch upstream
    ```

5.  **Merge the Boilerplate into Your Project**
    Merge the `main` branch from the boilerplate. The `--allow-unrelated-histories` flag is required because the two projects started with separate histories.
    ```bash
    git merge upstream/main --allow-unrelated-histories
    ```
    > **Note:** If you have merge conflicts (e.g., both projects have a `README.md`), you must resolve them manually in your code editor before proceeding. After resolving, run `git add .` and `git commit`.

6.  **Push the Merged Result**
    Send the newly combined history and files to your client project's repository on GitHub.
    ```bash
    git push origin main
    ```

**Setup complete! Your project now contains the boilerplate code.**

---

#### **Part 2: Getting Future Updates (Routine Task)**

Use this procedure whenever you update the `lnd-boilerplate` and want to pull those changes into your client project.

1.  **Navigate to Your Project Directory**
    Make sure you are in the correct client project folder.
    ```bash
    cd <CLIENT_PROJECT_NAME>
    ```

2.  **Fetch the Latest Changes from the Boilerplate**
    ```bash
    git fetch upstream
    ```

3.  **Merge the Updates**
    Merge the changes from the boilerplate's `main` branch into your current branch. You do **not** need the `--allow-unrelated-histories` flag this time, as Git now knows the repositories are related.
    ```bash
    git merge upstream/main
    ```
    > **Note:** Again, resolve any merge conflicts if they occur.

4.  **Push the Updates to Your Project**
    Save the updates to your client project's repository.
    ```bash
    git push origin main
    ```

This workflow allows you to maintain your boilerplate centrally and distribute improvements to all client projects that depend on it.