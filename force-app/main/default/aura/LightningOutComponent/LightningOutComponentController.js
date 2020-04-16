({
  doInit: function(component, event, helper) {
    console.log(component.get("v.componentName"));
    let componentName = component.get("v.componentName");
    let componentAttributes = JSON.parse(
      component.get("v.componentAttributes")
    );
    $A.createComponent(componentName, componentAttributes, function(
      newCaseList
    ) {
      if (component.isValid()) {
        var body = component.get("v.body");
        body.push(newCaseList);
        component.set("v.body", body);
      }
    });
  }
});
