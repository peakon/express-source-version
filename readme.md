# express-source-version

An express middleware that tries to resolve the source version and put it on the response locals.

Usage:
```
app.use(require('express-source-version'));
```

The source version can then be access in `res.locals.sourceVersion`.