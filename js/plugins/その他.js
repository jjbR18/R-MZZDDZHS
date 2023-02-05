/*:ja
 * @plugindesc その他
 * @author KICHUREA
 *
 * @help 
 *$gameParty.npc()["love"]
 *$gameParty.npc()["love"]
 *
 *
 *
 *
 *
 */

(function() {

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///ダメージをに孕ませ回数を加算
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
Game_Action.prototype.makeDamageValue = function(target, critical) {
    var item = this.item();
    var baseValue = this.evalDamageFormula(target);
    var value = baseValue * this.calcElementRate(target);
    if (this.isPhysical()) {
        value *= target.pdr;
    }
    if (this.isMagical()) {
        value *= target.mdr;
    }
    if (baseValue < 0) {
        value *= target.rec;
    }
    if (critical) {
        value = this.applyCritical(value);
    }
    value = this.applyVariance(value, item.damage.variance);
    value = this.applyGuard(value, target);
    value = Math.round(value);
    
    ///魔改造
    $gameVariables._data[2] = $gameVariables.value(246);
    var plus_value = Math.max($gameParty.npc()["nakadasi"] - 120, 0);
    plus_value += Math.max($gameParty.npc()["harami"] - 20, 0) * 5;
    
///もし-1なら無限、そうじゃないなら限界値にする。
    if ( $gameVariables.value(247) == -1 ) {;
} else if ( plus_value >= $gameVariables.value(247) ) {plus_value = $gameVariables.value(247);} 
    
    
console.log("増加ダメージ");
console.log(plus_value);

    value += plus_value
    
    return value;
};
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////データベースからアクターネーム取得。
    var _Window_Base_prototype_convertEscapeCharacters = Window_Base.prototype.convertEscapeCharacters;
    Window_Base.prototype.convertEscapeCharacters = function(text) {
    text = _Window_Base_prototype_convertEscapeCharacters.call(this, text);
    
        text = text.replace(/\x1bDN\[(\d+)\]/gi, function() {
        return this.database_actorName(parseInt(arguments[1]));
    }.bind(this));
    return text;
    };
    
    Window_Base.prototype.database_actorName = function(n) {
    var actor = n >= 1 ? $dataActors[n] : null;
    return actor ? actor.name : ''; ////actor.name()・・・（）つけたらエラー発生。
    };
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////変数が条件を満たすなら、減らしてtrueを返す。アイテムなら個数を減らす。
////$gameVariables.v_trade(1,50)
////$gameParty.i_trade(2,2)
Game_Variables.prototype.v_trade = function(variableId, value) {
    if(this._data[variableId] >= value){this._data[variableId] -= value ; return true; }
    return false;
};
Game_Party.prototype.i_trade = function(num, value) {
    if($gameParty.numItems($dataItems[num]) >= value){$gameParty.loseItem($dataItems[num], value) ; return true; }
    return false;
};
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////カクつき防止
Game_Actor.prototype.stepsForTurn = function() {
    return 0;
};
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// キャラのデータの作成。グレードアップ用
// $gameParty.npc()
   Game_Party.prototype.npc = function() {

   var npcid = $gameVariables.value(2);
   
    //NPC配列を新規作成
    if ( Array.isArray(this._npc) == false ) {
     this._npc = [];
      }
      //NPCIDのキャラデータを新規作成
    ///////////if ( this._npc[npcid] == null ) { this.npc_ini(); }
 this.npc_ini();
    return this._npc[npcid]
   }; 
   
//各データが数値じゃない場合、０を入力///////////
Game_Party.prototype.npc_ini = function() {
   var npcid = $gameVariables.value(2);
if ( this._npc[npcid] == null ) { this._npc[npcid] = { mood: 0} } //各キャラ固有の配列を作成

if ( isNaN(this._npc[npcid]["plus"])  == true )    { this._npc[npcid]["plus"] = 0;} //種付けで＋１される
if ( isNaN(this._npc[npcid]["mood"])  == true )    { this._npc[npcid]["mood"] = 0;} //ムード
if ( isNaN(this._npc[npcid]["harami?"])  == true ) { this._npc[npcid]["harami?"] = 0;}  //0なら孕み画像を表示しない
if ( isNaN(this._npc[npcid]["nakadasi"])  == true ) { this._npc[npcid]["nakadasi"] = 0;}  //なかだし回数
if ( isNaN(this._npc[npcid]["harami"])  == true )  { this._npc[npcid]["harami"] = 0;}  //孕み回数
if ( isNaN(this._npc[npcid]["lastLV"])  == true )  { this._npc[npcid]["lastLV"] = 0;}  //最後に種付けしたレベル
if ( isNaN(this._npc[npcid]["bp_plus_a"])  == true )  { this._npc[npcid]["bp_plus_a"] = 0;}  //BP強化：攻撃
if ( isNaN(this._npc[npcid]["bp_plus_b"])  == true )  { this._npc[npcid]["bp_plus_b"] = 0;}  //BP強化：魔法
};
//////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////今のクラスのEXPを表示
Game_Actor.prototype.exp_nowjob = function() {
    return this._exp[this._classId];
};


// Show Text   文章を一瞬で表示する/////////////////////////////////////////////////////////////////////////////////////////////// 
Game_Interpreter.prototype.command101 = function() {
    if (!$gameMessage.isBusy()) {
        $gameMessage.setFaceImage(this._params[0], this._params[1]);
        $gameMessage.setBackground(this._params[2]);
        $gameMessage.setPositionType(this._params[3]);
        while (this.nextEventCode() === 401) {  // Text data
            this._index++;
            $gameMessage.add("\\>" + this.currentCommand().parameters[0]);
        }
        switch (this.nextEventCode()) {
        case 102:  // Show Choices
            this._index++;
            this.setupChoices(this.currentCommand().parameters);
            break;
        case 103:  // Input Number
            this._index++;
            this.setupNumInput(this.currentCommand().parameters);
            break;
        case 104:  // Select Item
            this._index++;
            this.setupItemChoice(this.currentCommand().parameters);
            break;
        }
        this._index++;
        this.setWaitMode('message');
    }
    return false;
};




Game_Screen.prototype.changeopPicture = function(pictureId, op) {
    var picture = this.picture(pictureId);
    if (picture) {
        picture._opacity = op;
    }
};





// ランダム出現イベント//////////////////////////////////////////////////////////////////////////////////////////////// 
Scene_Map.prototype.start = function() {
    Scene_Base.prototype.start.call(this);
    SceneManager.clearStack();
    if (this._transfer) {
        this.fadeInForTransfer();
        this._mapNameWindow.open();
        $gameMap.autoplay();
    } else if (this.needsFadeIn()) {
        this.startFadeIn(this.fadeSpeed(), false);
    }
    this.menuCalling = false;
    
    
$gameVariables._data[20] = $gameMap.mapId()

    
};
Game_Event.prototype.meetsConditions = function(page) {
    var c = page.conditions;
////////////////////////////////////////////////////////////////////////////////

if ( $gameVariables._data[20] != $gameMap.mapId() ) {
  if (this.event().note.match(/per/)) {
        if (this.event().meta.per <= Math.floor( Math.random() * 101)) {
        $gameSelfSwitches.setValue([$gameMap.mapId(),this.event().id,"A"], true); 
        } else {
        $gameSelfSwitches.setValue([$gameMap.mapId(),this.event().id,"A"], false);
        }
  }    
}   
        
       
        
//////////////////////////////////////////////////////////////////////////////////
    
    
    if (c.switch1Valid) {
        if (!$gameSwitches.value(c.switch1Id)) {
            return false;
        }
    }
    if (c.switch2Valid) {
        if (!$gameSwitches.value(c.switch2Id)) {
            return false;
        }
    }
    if (c.variableValid) {
        if ($gameVariables.value(c.variableId) < c.variableValue) {
            return false;
        }
    }
    if (c.selfSwitchValid) {
        var key = [this._mapId, this._eventId, c.selfSwitchCh];
        if ($gameSelfSwitches.value(key) !== true) {
            return false;
        }
    }
    if (c.itemValid) {
        var item = $dataItems[c.itemId];
        if (!$gameParty.hasItem(item)) {
            return false;
        }
    }
    if (c.actorValid) {
        var actor = $gameActors.actor(c.actorId);
        if (!$gameParty.members().contains(actor)) {
            return false;
        }
    }
    return true;
};

//////インプットにAを追加///////////////////////////////////////////////////////////
Input.keyMapper[65] = 'A';
Input.keyMapper[69] = 'E';
//////TPを表示しない///////////////////////////////////////////////////////////
//Window_SkillList.prototype.drawSkillCost = function(skill, x, y, width) {
//    if (this._actor.skillTpCost(skill) > 0) {
//   /////this.changeTextColor(this.tpCostColor());
//   /////this.drawText(this._actor.skillTpCost(skill), x, y, width, 'right');
//        this.changeTextColor(this.mpCostColor());
//        this.drawText(this._actor.skillMpCost(skill), x, y, width, 'right');
//    } else if (this._actor.skillMpCost(skill) > 0) {
//        this.changeTextColor(this.mpCostColor());
//        this.drawText(this._actor.skillMpCost(skill), x, y, width, 'right');
//    }
//};


////セーブファイルの名前///////////////////////////////////////////////////////////
DataManager.makeSavefileInfo = function() {
var info = {};
info.globalId = this._globalId;
info.title = $dataSystem.gameTitle;
info.characters = $gameParty.charactersForSavefile();
info.faces = $gameParty.facesForSavefile();
info.playtime = $gameSystem.playtimeText();
info.timestamp = Date.now();
info.saveString = $gameActors.actor(1)._name;
return info;
};
Window_SavefileList.prototype.drawGameTitle = function(info, x, y, width) {
    if (info.title) {
        this.drawText(info.saveString, x, y, width);
    }
};

///////////////////////////////////////////////////////////////
})();
