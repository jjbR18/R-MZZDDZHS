/*:ja
 * @plugindesc
 * @author KICHUREA
 *
 * @help このプラグインには、プラグインコマンドはありません。
 */

(function() {



                             

// Window_Point

function Window_Point() {
    this.initialize.apply(this, arguments);
}

Window_Point.prototype = Object.create(Window_Base.prototype);
Window_Point.prototype.constructor = Window_Point;

Window_Point.prototype.initialize = function(x, y) {
    var width = this.windowWidth();
    var height = this.windowHeight();
    Window_Base.prototype.initialize.call(this, x, y, width, height);
    this.refresh();
};

Window_Point.prototype.windowWidth = function() {
    return 240;
};

Window_Point.prototype.windowHeight = function() {
    return this.fittingHeight(1);
};

Window_Point.prototype.refresh = function() {
    var x = this.textPadding();
    var width = this.contents.width - this.textPadding() * 2;
    this.contents.clear();
    ///this.drawCurrencyValue(this.value(), this.currencyUnit(), x, 0, width);
    this.drawCurrencyValue(this.value(), "BP", x, 0, width);
};

Window_Point.prototype.value = function() {
    return $gameVariables.value(46);
};

Window_Point.prototype.currencyUnit = function() {
    return TextManager.currencyUnit;
};

Window_Point.prototype.open = function() {
    this.refresh();
    Window_Base.prototype.open.call(this);
};

///////////////////////////////////////////////////////////////////////////
Scene_Menu.prototype.createGoldWindow = function() {
    this._goldWindow = new Window_Gold(0, 0);
    this._goldWindow.y = Graphics.boxHeight - this._goldWindow.height;
    this.addWindow(this._goldWindow);
    this._pointWindow = new Window_Point(0, 0);
    this._pointWindow.x = 770 ;
    this._pointWindow.y = Graphics.boxHeight - this._goldWindow.height;
    this.addWindow(this._pointWindow);
};
///////////////////////////////////////////////////////////////////////////


})();
