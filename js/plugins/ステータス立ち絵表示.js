/*:ja
 * @plugindesc　立ち絵を表示する。
 * @author KICHUREA
 *
 * @help 
 *
 *
 *
 *
 *
 */

(function() {
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// 

Window_Base.prototype.drawActorClass = function(actor, x, y, width) {
    width = width || 168;
    this.resetTextColor();
    $gameVariables._data[2] = actor._actorId;
    var p_drw = ""
    if ($gameParty.npc()["plus"] >= 1) { var p_drw = 'SEX' + $gameParty.npc()["plus"] }
    this.drawText(actor.currentClass().name + p_drw , x, y, width + 50);
};
Window_Base.prototype.drawActorMood = function(actor, x, y, width) {
    width = width || 168;
    this.resetTextColor();
    $gameVariables._data[2] = actor._actorId;
    this.drawText("心情值：" + $gameParty.npc()["mood"] + " / 15", x, y +10 +120, width + 100);
    this.drawText("内射次数：" + $gameParty.npc()["nakadasi"] , x, y + 30 +10 +120, width + 100);
    this.drawText("怀孕次数：" + $gameParty.npc()["harami"] , x, y + 60 +10 +120, width + 100);
    if ($gameParty.npc()["bp_plus_a"] >= 1) { this.drawText("V強化：攻击" , x, y + 90 +10 +120, width + 100);}
    if ($gameParty.npc()["bp_plus_b"] >= 1) { this.drawText("V強化：魔法" , x, y + 120 +10 +120, width + 100);}
    
};


Window_Status.prototype.initialize = function() {
    var width = Graphics.boxWidth;
    var height = Graphics.boxHeight;
    Window_Selectable.prototype.initialize.call(this, 0, 0, width, height);
    this.refresh();
    this.activate();
};

Window_Status.prototype.setActor = function(actor) {
    if (this._actor !== actor) {
        this._actor = actor;
        this.refresh();
    }
};

Window_Status.prototype.refresh = function() {
    this.contents.clear();
    if (this._actor) {
        var lineHeight = this.lineHeight();
        this.drawBlock1(lineHeight * 0);
        this.drawBlock2(lineHeight * 2);
        this.drawBlock3(lineHeight * 7);
       ///// this.drawBlock4(lineHeight * 14);
        this.drawBlock4(lineHeight * 17);
    }
};

Window_Status.prototype.drawBlock1 = function(y) {
    this.drawActorName(this._actor, 6 + 600, y);
    this.drawActorClass(this._actor, 192 + 600, y);
    this.drawActorNickname(this._actor, 432 + 600, y);
    
    this.drawActorMood(this._actor, 6 + 600, y + 530);
    
    
};

Window_MenuStatus.prototype.loadImages = function() {
    $gameParty.members().forEach(function(actor) {
        ImageManager.loadEnemy($dataClasses[actor._classId].meta.stand_picture);
        ImageManager.loadEnemy("N" + $dataClasses[actor._classId].meta.stand_picture);
    }, this);
};

Window_Base.prototype.drawbt = function(act) {
    width = 600;height = 800;
    var bitmap = ImageManager.loadEnemy($dataClasses[act._classId].meta.stand_picture);
if ($gameSwitches.value(18) == true) {var bitmap = ImageManager.loadEnemy("N" + $dataClasses[act._classId].meta.stand_picture);}
    this.contents.blt(bitmap, 0, 0, 600, 800, 0, 0);
};

Window_Status.prototype.drawBlock2 = function(y) {
    this.drawbt(this._actor);
    this.drawBasicInfo(204 + 440, y);
    this.drawExpInfo(456 + 440, y);
};

Window_Status.prototype.drawBlock3 = function(y) {
    this.drawParameters(48 + 600, y);
    this.drawEquipments(432 + 600 - 120, y);
};

Window_Status.prototype.drawBlock4 = function(y) {
    this.drawProfile(6 + 600, y);
};



Window_Status.prototype.lineColor = function() {
    return this.normalColor();
};
Window_Base.prototype.drawActorLevel = function(actor, x, y) {
    this.changeTextColor(this.systemColor());
    this.drawText(TextManager.levelA, x, y, 48);
    this.resetTextColor();
    
    var rankup_drw = ""
    if ($dataClasses[actor._classId].meta.rankup_id != null) { var rankup_drw = " [等待升阶]" 
    if ($dataClasses[actor._classId].meta.rankup_lv <= actor._level) {var rankup_drw = " [可以升阶]"  }
    }
    
    this.drawText(actor.level + rankup_drw, x + 40, y, 200, 'left');
};

Window_Status.prototype.drawBasicInfo = function(x, y) {
    var lineHeight = this.lineHeight();
    this.drawActorLevel(this._actor, x, y + lineHeight * 0);
    this.drawActorIcons(this._actor, x, y + lineHeight * 1);
    this.drawActorHp(this._actor, x, y + lineHeight * 2);
    this.drawActorMp(this._actor, x, y + lineHeight * 3);
};

Window_Status.prototype.drawParameters = function(x, y) {
    var lineHeight = this.lineHeight();
    for (var i = 0; i < 6; i++) {
        var paramId = i + 2;
        var y2 = y + lineHeight * i;
        this.changeTextColor(this.systemColor());
        this.drawText(TextManager.param(paramId), x, y2, 160);
        this.resetTextColor();
        this.drawText(this._actor.param(paramId), x + 160, y2, 60, 'right');
    }
};

Window_Status.prototype.drawExpInfo = function(x, y) {
    var lineHeight = this.lineHeight();
    var expTotal = TextManager.expTotal.format(TextManager.exp);
    var expNext = TextManager.expNext.format(TextManager.level);
    var value1 = this._actor.currentExp();
    var value2 = this._actor.nextRequiredExp();
    if (this._actor.isMaxLevel()) {
        value1 = '-------';
        value2 = '-------';
    }
    this.changeTextColor(this.systemColor());
    this.drawText(expTotal, x, y + lineHeight * 0, 270);
    this.drawText(expNext, x, y + lineHeight * 2, 270);
    this.resetTextColor();
    this.drawText(value1, x, y + lineHeight * 1, 270, 'right');
    this.drawText(value2, x, y + lineHeight * 3, 270, 'right');
};

Window_Status.prototype.drawEquipments = function(x, y) {
    var equips = this._actor.equips();
    var count = Math.min(equips.length, this.maxEquipmentLines());
    for (var i = 0; i < count; i++) {
        this.drawItemName(equips[i], x, y + this.lineHeight() * i);
    }
};


////kichurea
Window_Status.prototype.drawProfile = function(x, y) {
////this.drawTextEx(this._actor.profile(), x, y);
    this.drawTextEx($dataActors[this._actor._classId].profile, x, y);
};
////////////////
Window_Status.prototype.maxEquipmentLines = function() {
    return 9;
};




///////////////////////////////////////////////////////////////
})();
