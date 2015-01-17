/// <reference path="Scripts/jquery-1.7.1.js" />
/// <reference path="Scripts/jquery.cookie.js" />
/// <reference path="Scripts/jqGrid/jquery.jqGrid.min.js" />
/// <reference path="Scripts/jqGrid/i18n/grid.locale-cn.js" />

$(document).ready(function () {
    $("#refresh").click(retrieve);

    $("#jqGrid").jqGrid({
        //url: 'data.json',
        datatype: "local",
        colModel: [
           { label: '时间', name: 'LogDate', width: 30, sorttype: 'date' },
           { label: '日志', name: 'Msg', width: 75 }
        ],
        viewrecords: true, // show the current page, data rang and total records on the toolbar
        width: 780,
        height: 200,
        rowNum: 30,
        pager: "#jqGridPager"
    });

    function retrieve() {
        var request = {};
        $("#jqGrid").clearGridData();
        // show loading message
        $("#jqGrid")[0].grid.beginReq();
        $.post("api.ashx", { method: "GetLogs", requestbody: JSON.stringify(request) }, function (data) {
            if (data.ErrMsg) {
                alert(data.ErrMsg);
            }
            else {
                // DONE: 填充数据
                // set the new data
                $("#jqGrid").jqGrid('setGridParam', { data: data.msgs });
                // hide the show message
                $("#jqGrid")[0].grid.endReq();
                // refresh the grid
                $("#jqGrid").trigger('reloadGrid');
            }
        }, "json");
    };
});