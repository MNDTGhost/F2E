var _header = {};
var action = {};
var _jsonData = [];

$(function () {
    init();
});

function init() {
    _header.select_id = "tab1";
    _jsonData = [{ title: "Type Something Here...", date: "", datetime: "", file: "test.txt", comment: "", favorite: "1" },
           { title: "Type Something Here...", long_date: "2018/5/20", date: "5/20", datetime: "07:00", file: "", comment: "test", favorite: "0" },
           { title: "Type Something Here...", long_date: "2018/5/21", date: "5/21", datetime: "08:00", file: "test.txt", comment: "test", favorite: "0" }];
    initView();
}

function initView() {
    var htmlData = [];
    for (var index = 0; index < _jsonData.length; index++) {
        var favorite = "";
        var dataIcon = "";

        if (_jsonData[index].favorite == "1") {
            favorite = "select";
        }

        if (_jsonData[index].date != "") {
            dataIcon += "    <i class='far fa-calendar-alt icon cl-gray3'>" + _jsonData[index].date + "</i> ";
        }

        if (_jsonData[index].file != "") {
            dataIcon += " <i class='far fa-file icon cl-gray3'></i> ";
        }

        if (_jsonData[index].comment != "") {
            dataIcon += " <i class='far fa-comment-dots icon cl-gray3'></i> ";
        }

        htmlData.push(" <form class='form'> ");
        htmlData.push(" <div class='form-group bg-gray1 star-root " + favorite + "'> ");
        htmlData.push(" <div class='row'> ");
        htmlData.push(" <div class='col-8'> ");
        htmlData.push(" <div class='frame-cb cb-blue'> ");
        htmlData.push(" <input type='checkbox' id='item_ch" + index + "' /> ");
        htmlData.push(" <label for='item_ch" + index + "'>" + _jsonData[index].title + "</label> ");
        htmlData.push(" </div> ");
        htmlData.push(" </div> ");
        htmlData.push(" <div class='col-4 right icon-div'> ");
        htmlData.push(" <i class='far fa-star star " + favorite + "' onclick='favoriteSelect(this);'> "); htmlData.push(" </i> ");
        htmlData.push(" <i class='fas fa-marker edit' id='btn_edit_" + index + "' tag='" + index + "' onclick='editSelect(this);' > </i> ");
        htmlData.push(" </div> ");
        htmlData.push(" </div> ");
        htmlData.push(" <div class='row content-title' id='icon_div" + index + "'> ");
        htmlData.push(dataIcon);
        htmlData.push(" </div> ");
        htmlData.push(" </div> ");


        htmlData.push(" <div class='form-group bg-gray1 bottom-end right-end left-end' id='edit" + index + "' style='display:none;'> ");
        htmlData.push(" <div class='row content-title'> ");
        htmlData.push(" <div class='col-icon'> ");
        htmlData.push(" <i class='far fa-calendar-alt'> "); htmlData.push(" </i> ");
        htmlData.push(" </div> ");
        htmlData.push(" <div class='col-data'>Deadline</div> ");
        htmlData.push(" </div> ");
        htmlData.push(" <div class='row content-data'> ");
        htmlData.push(" <div class='col-4'> ");
        htmlData.push(" <input type='text' placeholder='yyyy/mm/dd' class='in-white' value='" + _jsonData[index].long_date + "' /> ");
        htmlData.push(" </div> ");
        htmlData.push(" <div class='col-4'> ");
        htmlData.push(" <input type='text' placeholder='hh:mm' class='in-white' value='" + _jsonData[index].datetime + "' /> ");
        htmlData.push(" </div> ");
        htmlData.push(" </div> ");
        htmlData.push(" <div class='row content-title'> ");
        htmlData.push(" <div class='col-icon'> ");
        htmlData.push(" <i class='far fa-file col-icon'></i> ");
        htmlData.push(" </div> ");
        htmlData.push(" <div class='col-data'>File</div> ");
        htmlData.push(" </div> ");
        htmlData.push(" <div class='row content-data'> ");
        htmlData.push(" <label class='cl-gray3' id='edit_file_lab" + index + "'>" + _jsonData[index].file + "</label> ");
        htmlData.push(" <input type='button' class='btn-file' value='＋' onclick='$(\"#edit_file" + index + "\").click();' /> ");
        htmlData.push(" <input type='file' id='edit_file" + index + "' class='in-white' hidden='hidden' onchange='fileChange(this, \"#edit_file_lab" + index + "\");' /> ");
        htmlData.push(" </div> ");
        htmlData.push(" <div class='row content-title'> ");
        htmlData.push(" <div class='col-icon'> ");
        htmlData.push(" <i class='far fa-comment-dots col-icon'></i> ");
        htmlData.push(" </div> ");
        htmlData.push(" <div class='col-data'>Comment</div> ");
        htmlData.push(" </div> ");
        htmlData.push(" <div class='row content-data'> ");
        htmlData.push(" <textarea id='insert_comment' class='textarea-nre' placeholder='Type your memo here...' value='" + _jsonData[index].comment + "'></textarea> ");
        htmlData.push(" </div> ");
        htmlData.push(" <div class='row botton'> ");
        htmlData.push(" <div class='col-6'> ");
        htmlData.push(" <input type='button' value='× Cancel' class='btn-cancel' onclick='editClose(\"#btn_edit_" + index + "\");' /> ");

        htmlData.push(" </div> ");
        htmlData.push(" <div class='col-6'> ");
        htmlData.push(" <input type='button' value='＋ Edit' class='btn-add' /> ");
        htmlData.push(" </div> ");
        htmlData.push(" </div> ");
        htmlData.push(" </div> ");
        htmlData.push(" </form> ");
    }
    $("#view").html(htmlData.join(''));
}

function headerTabSelect(that) {

    if (_header.select_id.toString() == that.id.toString()) {
        return;
    }

    $("#" + _header.select_id).removeClass("select");
    $(that).addClass("select");
    _header.select_id = that.id;
}

function fileChange(that, labObj) {
    $(labObj).text($(that).val());
}

function insertAction() {
    if (action.insert) {
        $("#insert").slideUp();
        $("#btn_insert").slideDown();
        action.insert = false;
    } else {
        $("#btn_insert").slideUp();
        $("#insert").slideDown();
        action.insert = true;
    }
}

function favoriteSelect(that) {
    if ($(that).hasClass('select')) {
        $(that).removeClass('select');
        $(that).parents(".star-root").removeClass('select');
    } else {
        $(that).addClass('select');
        $(that).parents(".star-root").addClass('select');
    }
}

function editSelect(that) {
    var obj = $(that);
    var index = obj.attr('tag');
    var editObj = $("#edit" + index);
    var iconObg = $("#icon_div" + index);

    if (iconObg.hasClass("hide")) {
        editClose(that)
        return;
    }
    var htmlData = [];
    iconObg.slideUp();
    editObj.slideDown();
    iconObg.addClass("hide");
    obj.addClass("select");
}

function editClose(that) {
    var obj = $(that);
    var index = obj.attr('tag');
    var editObj = $("#edit" + index);
    var iconObg = $("#icon_div" + index);
    iconObg.slideDown();
    editObj.slideUp();
    iconObg.removeClass("hide");
    obj.removeClass("select");
}