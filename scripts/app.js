var reminder = angular.module('reminder',[]);
reminder.controller('listCtrl',['$scope',function($scope){
    //从本地取得数据
    var colorIndex = 0,id;
    if(localStorage.list){
	$scope.lists = JSON.parse(localStorage.list);
	id = $scope.lists[$scope.lists.length-1].id + 1;
	$scope.currentlist = $scope.lists[0];
    }else{
	$scope.lists = [];
	id = 0;
    }

    //色彩数据
    $scope.colors = ['green','yellow','blue','orange','purple','brow','pink'];

    //将数据保存到localStorage
    $scope.saveData = function(){
	localStorage.list = JSON.stringify($scope.lists);
    }

    //新增列表
    $scope.addItem = function(){
	if(colorIndex === $scope.colors.length){
	    colorIndex = 0;
	}
	var list = {id:id++,name:'新列表 '+($scope.lists.length+1),color:$scope.colors[colorIndex++],todos:[]};
    	$scope.lists.push(list);
	$scope.currentlist = list;
	$scope.saveData();
    }
    //设置点击为当前列表
    $scope.setCurrent = function(li){
	$scope.currentlist = li;
    }

    //选项显示与关闭
    $scope.isshow=false;
    $scope.showhideop = function(el){
	$scope.isshow = $scope.isshow?false:true;
	el.stopPropagation();
    }
    $scope.cancle = function(){
	$scope.isshow = false;
    }

    //删除列表
    $scope.deleteItem = function(){
	$scope.lists = $scope.lists.filter(function(d){
	    return d.id != $scope.currentlist.id;
	})
	$scope.currentlist = $scope.lists[0];
	$scope.isshow = false;
	$scope.saveData();
    }

    $scope.setcurrenttodo = function(todo){
	$scope.currenttodo = todo;
    }

    $scope.countdoneitem = function(){
    	var r = 0;
    	$scope.currentlist.todos.forEach(function(data){
    	    if(data.isdone){
    		r += 1;
    	    }
    	})
    	return r;
    }

    $scope.isshowdone = false;
    $scope.toggleshowdone = function(){
	$scope.isshowdone = $scope.isshowdone?false:true;
    }
    $scope.deletetodo = function(){
	$scope.currentlist.todos = $scope.currentlist.todos.filter(function(data){
	    return data != $scope.currenttodo;
	})
	$scope.isshow2 = false;
	$scope.saveData();
    }

    $scope.isshow2 = false;
    $scope.toggletododetail = function($event){
	document.querySelector('#todo-detail').style.top=$event.clientY - 100 + 'px'
	$scope.isshow2 = $scope.isshow2?false:true;
    }

    $scope.addtodo = function(){
	var newtodo = {name:'',time:new Date(),isdone:false};
	$scope.currentlist.todos.push(newtodo);
	$scope.currenttodo = newtodo;
	document.querySelector()
	$scope.saveData();
    }
}]);

