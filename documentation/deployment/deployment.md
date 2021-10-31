
https://medium.com/swlh/pantheon-and-github-actions-automated-deployments-via-github-actions-c245aa954797



?? https://pantheon.io/docs/guides/collaborative-development
https://pantheon.io/docs/migrate-manual
https://pantheon.io/docs/migrate



# git subtree...
this one is the best?: https://www.deployhq.com/git/faqs/detatch-subdirectory-git-submodule

https://stackoverflow.com/questions/42026669/how-to-push-to-git-subtree
https://blog.developer.atlassian.com/the-power-of-git-subtree/
https://gist.github.com/SKempin/b7857a6ff6bddb05717cc17a44091202
https://www.atlassian.com/git/tutorials/git-subtree
https://stackoverflow.com/questions/28593584/what-is-the-difference-between-git-subtree-pull-and-git-pull-s-subtree



# pantheon steps
- instructions: https://pantheon.io/docs/migrate-manual#from-the-command-line-with-git
1. Copy the SSH URL for the site repository. Do not copy git clone or the site name
```bash
# get ssh url from pantheon (follow docs to get site id)
ssh://codeserver.dev.[site-id]@codeserver.dev.[site-id].drush.in:2222/~/repository.git
```

2. Add your new Pantheon site as a remote destination for your local code repository (replace <ssh_url> with the SSH URL copied in the previous step):

```bash
git remote add pantheon ssh://codeserver.dev.[site-id]@codeserver.dev.[site-id].drush.in:2222/~/repository.git
```

# I create a submodule because repo has a top level that I needed for local dev setup...
cd into html (new git submodule)

git push pantheon master 
