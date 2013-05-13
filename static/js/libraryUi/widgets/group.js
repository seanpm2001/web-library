Zotero.ui.widgets.groups = {};

Zotero.ui.userGroupsDisplay = function(groups){
    var html = '';
    J.each(groups.groupsArray, function(index, group){
        html += Zotero.ui.groupNugget(group);
    });
    return html;
};

Zotero.ui.displayGroupNuggets = function(el, groups){
    var jel = J(el);
    jel.empty();
    J.each(groups, function(ind, group){
        Z.debug("Displaying group nugget");
        Z.debug(group);
        var userID = zoteroData.loggedInUserID;
        var groupManageable = false;
        var memberCount = 1;
        if(group.apiObj.members) {
            memberCount += group.apiObj.members.length;
        }
        if(group.apiObj.admins){
            memberCount += group.apiObj.admins.length;
        }
        
        //Z.debug("UserID:" + userID);
        //Z.debug("user is group owner: " + (userID == group.apiObj.owner) );
        //Z.debug("User in admins: " + (J.inArray(userID, group.apiObj.admins)));
        if(userID && (userID == group.apiObj.owner || (J.inArray(userID, group.apiObj.admins) != -1 ))) {
            groupManageable = true;
        }
        J('#groupnuggetTemplate').tmpl({
            group:group.apiObj,
            groupViewUrl:Zotero.url.groupViewUrl(group),
            groupLibraryUrl:Zotero.url.groupLibraryUrl(group),
            groupSettingsUrl:Zotero.url.groupSettingsUrl(group),
            groupLibrarySettings:Zotero.url.groupLibrarySettingsUrl(group),
            memberCount:memberCount,
            groupManageable: groupManageable
        }).appendTo(jel);
    });
};

