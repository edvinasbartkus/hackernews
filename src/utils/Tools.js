module.exports = {
  /* joinWith - shim by Joseph Myers 7/6/2013 */
  merge: function(array, that, by, select, omit) {
            var together = [], tk = {}, length = 0;
            if (select) select.map(function(x){select[x] = 1;});
            function fields(it) {
                var f = {}, k;
                for (k in it) {
                    if (!select) { f[k] = 1; continue; }
                    if (omit ? !select[k] : select[k]) f[k] = 1;
                }
                return f;
            }
            function add(it) {
                var pkey = '.'+it[by], pobj = {};
                if (!tk[pkey]) tk[pkey] = pobj,
                    together[length++] = pobj;
                pobj = tk[pkey];
                for (var k in fields(it))
                    pobj[k] = it[k];
            }
            try {
              array.map(add);
            } catch(e) {
              console.log("Here is an error with", that);
            }
              that.map(add);
              return together;
            },
};