//Template for Profile cardwithin function to append template to desired section
var bill = new Date(Mathdrquinn.created_at);
var monthStep = bill.getMonth();
var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'Jul', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];
var month = months[monthStep];
var day = bill.getDay();
var year = bill.getYear() +1900;

var createCard = function(object, $placement) {
  fragment = "<img class=\"avatar-pic\" src=" + object.avatar_url + " alt=\"Avatar image\">"
    + "<h1>" + object.name + "</h1>"
    + "<h2>" + object.login + "</h2>"
    + "<hr/>"
    + "<p class=\"contact\" id=\"location\"><img class=\"mini-icon\" src=\"images/location_icon.png\" alt=\"\">" + object.location + "</p>"
    + "<p class=\"contact\" id=\"email\"><img class=\"mini-icon\" src=\"images/email_icon.png\" alt=\"\"><a href=\"\">" +  object.email + "</a></p>"
    + "<p class=\"contact\" id=\"date-joined\"><img class=\"mini-icon\" src=\"images/clock_icon.png\" alt=\"\"> Joined on " + month + " " + day + ", " + year + "</p>"
    + "<hr/>"
    + "<div class=\"social\">"
      + "<div class=\"followers mini-social\">"
        + "<p>" + object.followers + "</p>"
        + "<p>Followers</p>"
      + "</div>"
      + "<div class=\"starred mini-social\">"
        + "<p>" + object.public_gists + "</p>"
        + "<p>Starred</p>"
      + "</div>"
      + "<div class=\"following mini-social\">"
        + "<p>" + object.following + "</p>"
        + "<p>Following</p>"
      + "</div>"
    + "</div>"
    + "<div>"
      + "<h3>Organiztions</h3>"
    + "</div>";
  $placement.append(fragment);
  };

var createLogin = function(object, $placement) {
  var fragment = "<li><img src=\"" + object.avatar_url + "\"></li>"
  + "<li>" + object.login + "<li>";
  $placement.prepend(fragment);
};

var reposString = [
  "<% _.each(reposArr, function(element, index, list) { %>",
    "<li>",
      "<h3><span class=\"mega-octicon octicon-repo\"></span><a href=\"<%= element.html_url %>\"> <%= element.name %> </a><div class=\"reposInfo\"> <span class=\"reposLang\"><%= element.language %></span><span class=\"reposStar\"> <img class=\"infoIcons\" id=\"starIcon\" src=\"images/star.png\"> <%= element.stargazers_count %> </span> <span class=\"reposFork\"> <img class=\"infoIcons\" id=\"forkIcon\" src=\"images/fork.png\"> <%= element.forks_count %> </span> </div></h3>",
      "<p> Last updated <%= moment(element.updated_at).fromNow() %></p>",
    "</li>",
  "<% }); %>"
].join("");

//String to make public activity
var publicString = [
  "<% _.each(publicArr, function(element, index, list) { %>",
    "<li>",
      "<div class=\"publicImage\"><span class=\"octicon octicon-git-branch\"></span></div>",
      "<div class=\"publicContent\"><a href=\"\"> <%= element.actor.login %> </a> created a repository <a href=\"<%= element.repo.url %>\"> <%= element.repo.name %> </a> </div>",
      "<div class=\"publicTime\"> <%= moment(element.created_at).fromNow() %></div>",
    "</li>",
  "<% }); %>"
].join("");

//Funciton to show which tab is being viewed
var changeTabs = function($tab) {
  $tab.siblings().removeClass('selectedTab');
  $tab.addClass('selectedTab');
};

//Funciton to show selected page
var changePage = function($tab) {
  console.log('start');
  //defining places to target
  var $article = $tab.closest('.meat').find('#article');
  var $search = $tab.closest('.meat').find('#searchMeat');
  console.log(article);
  console.log(search);
  //Hiding search bar
  if ($tab === $('#publicTab')) {
    $search.css('display', 'none');
  }
  else {
    $search.css('display', 'block');
  }
  //Remove text from #article
  console.log('middle');
  $article.html('');
  //condition to add or remove classes to #article (not working)
  if ($tab == $('#repoTab')) {
    $article.removeClass('publicList');
    $article.addClass('reposList');
  }
  else {
    //$article.removeClass('reposList');
    $article.addClass('publicList');
  }
  // $article.removeClass('reposList');
  // $article.addClass('publicList');
  console.log('end');
};

console.log(publicString);
$(document).ready(function() {
  console.log("made it!");
  createCard(Mathdrquinn, $('.left'));
  createLogin(Mathdrquinn, $('#navRight'));

//Function deliniating the display and locaiton of the Repositories
  var reposPage = {
    init: function() {
      console.log("Hey dude1")
      this.initStyling ();
      this.initEvents ();
    },
    initStyling: function () {
      console.log("Hey dude2")
      this.renderRepos ($('#article'));
    },
    initEvents: function () {
      console.log("Hey dude3")
      event.preventDefault();
    },
    renderRepos: function($target) {
      console.log("Hey dude4")
      this.render(reposString, reposArr, $target);
    },
    render: function(template, data, $target) {
      console.log("Hey dude5")
      var reposTempl = _.template(reposString, data);

      $target.append(reposTempl)
    }
  };

//Object to create public Activity
var publicPage = {
    init: function() {
      console.log("dude1")
      this.initStyling ();
      this.initEvents ();
    },
    initStyling: function () {
      console.log("dude2")
      this.renderPublic ($('#article'));
    },
    initEvents: function () {
      console.log("dude3")
      event.preventDefault();
    },
    renderPublic: function($target) {
      console.log("dude4")
      this.render(publicString, publicArr, $target);
    },
    render: function(template, data, $target) {
      console.log("dude5")
      var publicTempl = _.template(template, data);
      console.log("just made template");
      $target.append(publicTempl);
    }
  };


  //reposPage.init();
  //function to change tabs
  $('#tabs').on('click', '#publicTab', function (event) {
    event.preventDefault();
    changeTabs($('#publicTab'));
    changePage($('#publicTab'));
    publicPage.init();

  });

  //function to switch to Repository
  $('#tabs').on('click', '#repoTab', function (event) {
    event.preventDefault();
    changeTabs($('#repoTab'));
    changePage($('#repoTab'));
    reposPage.init();

  });
});
