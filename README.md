# Room Service Pre Exam

```mermaid
flowchart TD

    subgraph script
        ts
        tsx
    end
    
    subgraph stylesheet
        scss
    end
    
    subgraph webpack
        script --> babel-loader --> .dist/bundle.js
        stylesheet --> sass-loader --> css-loader --> mini-extract-css-loader --> .dist/main.css
    end
    
    .dist/bundle.js --> html
    .dist/main.css --> html
    
    subgraph html
        script-tag
        link-tag
    end

    html --> browser --> client
```

## Prerequisites

| Dependency | Version          |
|------------|------------------|
| node       | v18.17 or higher |
| npm        | v9.6.7 or higher |

## Getting Started

### Clone the repository

```shell
git clone 
```

### Install dependencies

```shell
npm install
```

### Run the application

Development watch mode would be run on https://localhost:3000

```shell
npm run dev
```

#### Build the application

##### development build

```shell
npm run build:dev
```

##### production build

```shell
npm run build:prod
```

> difference between development build 
> - minify
> - uglify

