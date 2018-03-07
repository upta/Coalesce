var ts = require("typescript");

module.exports = {  
    customCompilers: {
        ts: function(content , cb) {
            console.log(ts.version)
            var result = ts.transpileModule(content, { 
                compilerOptions: {
                    "experimentalDecorators": true,
                    "emitDecoratorMetadata": true,
                
                    "module": "es2015",
                    "moduleResolution": "node",
                    "target": "es5",
                    "strict": true,
                    "declaration": true,
                    "lib": ["es2015", "es2017", "dom"],
                  }
            });
            console.log(result.outputText);
            cb( null , result.outputText )            
        }
    }
}