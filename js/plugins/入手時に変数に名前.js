//
//孕ませ大冒険から変更。
//グレードアップからは、Change Gold以外削除。
//TinyGetInfoWndのほうで修正。＃KICHUREA
// Change Gold
Game_Interpreter.prototype.command125 = function() {
    var value = this.operateValue(this._params[0], this._params[1], this._params[2]);
    $gameParty.gainGold(value);
    $gameVariables.setValue(1, value); 
    return true;
};
