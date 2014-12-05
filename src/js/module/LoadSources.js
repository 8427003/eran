function LoadSources(args) {
    this.sources = args.sources || [];
    this.progress = args.progress;
    this.endload = args.endload;
    this.init();
}
LoadSources.prototype.init = function() {
    var _callbackParams = {
        total: this.sources.length
    }
    for (var i = 0; i < this.sources.length; i++) {
        (function(_this, i) {
            var sourceUrl = _this.sources[i];
            _callbackParams['sourceUrl'] = sourceUrl;
            var req = new Image();
            req.onload = function() {
                _callbackParams['loaded'] = i + 1;
                if (_this.progress && typeof _this.progress === 'function') {
                    setTimeout(_this.progress, 0, _callbackParams);
                    if ((i + 1) === _callbackParams.total && _this.endload && typeof _this.endload === 'function') {
                        sertTimeout(_this.endload, 0, _callbackParams);
                    }
                }
            }
            req.src = sourceUrl;
        })(this, i);
    }
}
module.exports = LoadSources;
