// ==UserScript==
// @name         コトシタ【スキル選択時】効果表示
// @namespace    http://tampermonkey.net/
// @version      1.0.2
// @description  スキル選択ドロップダウンリストの中に効果を入れるだけ
// @author       mikante927
// @require		 http://ajax.googleapis.com/ajax/libs/jquery/1.11.1/jquery.min.js
// @match        http://lisge.com/kk/a_edit.php*
// @match        http://lisge.com/kk/a_skill.php
// @grant        none
// ==/UserScript==

jQuery(document).ready(function($){
    'use strict';
    const selPrefix = (location.href == "http://lisge.com/kk/a_skill.php") ? "ss" : "sk";
    let dct = {};
    let doneList= {};
    let val;
    $("table.lst td.P2,table.lst td.B2").filter("[id ^= 'AB']").each( (idxtd,elmtd) => {
        val = $(elmtd).attr("id").substring(2);
        dct[val] = $(elmtd).text();
    });
    $("select.ARE").filter("[name ^= '"+selPrefix+"']").each( (idxsl,elmsl) => {
        $(elmsl).mousedown( () => {
            if ( ! (idxsl in doneList ) ) {
                $(elmsl).css("max-width", ($(elmsl).width()+2) +"px");
                doneList[idxsl] = true;
                $(elmsl).children("option").each( (idxop,elmop) => {
                    val = $(elmop).val();
                    if (val > 0){
                        $(elmop).text( $(elmop).text() + dct[val] );
                    }
                });
            }
        });
    });
});