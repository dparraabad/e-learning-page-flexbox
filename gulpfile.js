//Aquí irá la configuración de Gulp (Task Manager): funciona con tareas y cada tarea es una función que tendrá una instrucción que se ejecutará después de otras.
const gulp = require('gulp');
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');


//Esta función hará que al archivo seleccionado "app.scss" se le aplicará un autoprefixer y 
function css() {
  return gulp
    .src('scss/main.scss') //Servirá para enlazar el archivo de app.scss con este archivo para agregar los pipes
    .pipe(autoprefixer({
        overrideBrowserslist : ['last 2 versions'], //Hacer autoprefixer a todo lo que requiera las últimas 2 versiones del navegador
        cascade: false
    }))
    .pipe(sass({
      outputStyle: 'expanded', //nested, compact or compressed (minificado)
    }))
    .pipe(gulp.dest('css')); //carpeta destino que se estará generando después de todas las operaciones realizadas.
}

function watchFiles() {
  gulp.watch('scss/*.scss', css); //Cada vez que ocurra algún cambio se estará ejecutando la función de "css" por tanto se compilará de nuevo.
  gulp.watch('index.html')
}


//Registrar funciones como tareas
gulp.task('css', css); //Se llamará "css" y se registra en la función "css()"
// gulp.task('watch', watchFiles);
gulp.task('watch', gulp.parallel(watchFiles)); //Dentro de parallel estarán todas las tareas que se estarán corriendo en paralelo permitiendo mejorar el performance.