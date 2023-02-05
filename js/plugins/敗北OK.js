/*:ja
 * @plugindesc 敗北してもゲームオーバーにならなくなる。
 * @author KICHUREA
 *
 * @param Switch ID
 * @desc 敗北したときONされるスイッチID
 * @default 10
 *
 * @param CoEve ID
 * @desc 敗北時のコモンイベントID
 * @default 1
 *
 * @help 特に無し。
 */

(function() {

    var parameters = PluginManager.parameters('敗北OK');
    var switchId = Number(parameters['Switch ID'] || 0);
    var CoEveId = Number(parameters['CoEve ID'] || 0);

BattleManager.updateBattleEnd = function() {




    if (this.isBattleTest()) {
        AudioManager.stopBgm();
        SceneManager.exit();
    } else if ($gameParty.isAllDead()) {
        if (this._canLose) {
            $gameParty.reviveBattleMembers();
            SceneManager.pop();
        } else {
            //SceneManager.goto(Scene_Gameover);
	    $gameSwitches.setValue(switchId, true);
            
            $gameTemp.reserveCommonEvent(CoEveId);//KICHUREA　コモンイベント

            $gameParty.reviveBattleMembers();
            SceneManager.pop();
        }
        
    } else if (this._escaped) {
        SceneManager.pop();
        
    } else {
        SceneManager.pop();
        $gameTemp.reserveCommonEvent(24);//KICHUREA　コモンイベント
    }
    this._phase = null;




};

})();