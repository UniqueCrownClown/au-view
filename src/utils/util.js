// import的动态加载语法
export const dynamicImport = (path) => {
    import(path)
        .then(module => {
            console.log(module)
        })
        .catch(err => {
            console.log(err)
        });
}
