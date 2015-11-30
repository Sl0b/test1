angular.module('starter.controllers', [])

.controller('DashCtrl', function ($scope) {})

.controller('ChatsCtrl', function ($scope, Chats) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  $scope.chats = Chats.all();
  $scope.remove = function (chat) {
    Chats.remove(chat);
  };
})

.controller('ChatDetailCtrl', function ($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
})

.controller('TestCtrl', function ($scope, $ionicGesture, $window, $interval) {
  var pelle = new Snap('#svgout');

  Snap.load('img/jeu-intro.svg', function (response) {
    var testPelle = response;
    pelle.append(testPelle);

    var truc = pelle.select('#g208');
    var path = pelle.select('#path6638');

    var l = 0;
    var searchDl = 1;

    var pt = path.getPointAtLength(l);
    //e = r.ellipse(pt.x, pt.y, 4, 4).attr({stroke: "none", fill: "#f00"}),
    var totLen = path.getTotalLength();

    var start = function () {
      this.data("ox", +this.attr("cx"));
      this.data("oy", +this.attr("cy"));
      this.attr({
        opacity: 1
      });
    };
    var move = function (dx, dy) {
      var tmpPt = {
        x: this.data('ox') + dx,
        y: this.data('oy') + dy
      };
      // move will be called with dx and dy
      l = gradSearch(l, tmpPt);
      pt = path.getPointAtLength(l);
      console.log(pt);
      // this.attr({cx: pt.x, cy: pt.y});
      if (!isNaN(pt.x) && !isNaN(pt.y)) {
        // el.attr({cx: pt.x, cy: pt.y});
        this.transform('t' + (pt.x - this.data("ox")) + ',' + (pt.y - this.data("oy")));
      };
      console.log(this.matrix.e);
      console.log(this.matrix.f);
      this.attr({
        cx: pt.x,
        cy: pt.y
      });
    };
    var up = function () {

    };

    var gradSearch = function (l0, pt) {
      l0 = l0 + totLen;
      var l1 = l0,
        dist0 = dist(path.getPointAtLength(l0 % totLen), pt),
        dist1,
        searchDir;

      if (dist(path.getPointAtLength((l0 - searchDl) % totLen), pt) >
        dist(path.getPointAtLength((l0 + searchDl) % totLen), pt)) {
        searchDir = searchDl;
      } else {
        searchDir = -searchDl;
      }

      l1 += searchDir;
      dist1 = dist(path.getPointAtLength(l1 % totLen), pt);
      while (dist1 < dist0) {
        dist0 = dist1;
        l1 += searchDir;
        dist1 = dist(path.getPointAtLength(l1 % totLen), pt);
      }
      l1 -= searchDir;
      return (l1 % totLen);
    };

    var dist = function (pt1, pt2) {
      var dx = pt1.x - pt2.x;
      var dy = pt1.y - pt2.y;
      return Math.sqrt(dx * dx + dy * dy);
    };

    truc.drag(move, start, up);
  });
})

.controller('AccountCtrl', function ($scope) {
  $scope.settings = {
    enableFriends: true
  };
});