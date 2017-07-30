# CONTRIBUTING

Contributions are very welcome, and are accepted via pull requests. Please review these guidelines before submitting any pull requests.

## Guidelines

* Ensure that the current tests pass, and if you've added something new, add the tests where relevant.
* Send a coherent commit history, making sure each individual commit in your pull request is meaningful.
* You may need to [rebase](https://git-scm.com/book/en/v2/Git-Branching-Rebasing) to avoid merge conflicts.
* If you are changing the behavior, or the public api, you may need to update the docs.
* Please remember that we follow [SemVer](http://semver.org/).

## Bug Reporting

To report bugs or security concerns, please use the [GitHub issue tracker](https://github.com/thefreshvince/TheExterminator/issues) for this repository. It's always important to **search for similar bugs** before submitting your own. Perhaps someone has already reported your issue! If so, please add clarification and/or more information to the **existing** bug.

Please provide as much **relevant** information as possible to help us reproduce and fix the issue:

- **Bug summary**: Make sure your summary reflects what the problem is and where it is.
- **Reproduce steps**: Clearly mention the steps to reproduce the bug.
- **Expected behavior**: How OctoberCMS should behave on above mentioned steps.
- **Actual behavior**: What is the actual result on running above steps i.e. the bug behavior - **include any error messages**.

#### Code of conduct
We promise to extend courtesy and respect to everyone opening an issue. We expect anyone using the bug trackers to do the same.

All reported issues to this project are valuable. Please act with respect and avoid demeaning, condescending, racist, sexist and other inappropriate language and conduct. Please ensure comments stay professional and constructive.

## Pull requests

Your contributions to the project are very welcome. If you would like to fix a bug or propose a new feature, you can submit a Pull Request.

To help us merge your Pull Request, please make sure you follow these points:

1. Describe the problem clearly in the Pull Request description
2. Please make your fix on the `develop` branch. This makes merging much easier.
3. For any change that you make, **please try to also add a test case(s)** in the `tests/unit` directory.
