# <p align='center'> **utils** </p>

### Installation

```bash
git clone https://github.com/a-marigold/utils utils # clones the repository to directory "utils"
cd utils

bun run build # compiles code to standalone binary with JSC bytecode and Bun runtime
```

Set enviroment variable `PATH` in OS with path to compiled binary directory

### Usage

```bash

utils cc MyReactComponent
```

#### Commands

-   `cc` - Creates a directory with provided name with '.tsx' component file and CSS module file.

    Example - `utils cc MyReactComponent`
