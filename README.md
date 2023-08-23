# genexport
Simple script to generate index.ts file that exports all dependencies from a given place. 

For example if there is directory src/components/buttons  and has in it list of components like 
- AddButton
- RemoveButton
- EditButton

User can call `node genexport.js ./src/components/buttons` and script will create in src/components/buttons/index.ts with content:
```log
------- FILE CONTENT -----------
import { AddButton } from './AddButton';
import { RemoveButton } from './RemoveButton';
import { EditButton } from './EditButton';

export { AddButton, RemoveButton, EditButton };
--------------------------------

```

If index.ts already exists there will be error prompt:
```log
**ERROR**  There is index.ts there
```