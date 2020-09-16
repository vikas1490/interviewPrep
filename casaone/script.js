class EntityModel {
  constructor(data) {
    let _data = data || {
      entityName: "",
      operator: "",
      value: "",
    };
    let _changeListeners = {
      entityName: [],
      operator: [],
      value: [],
    };
    this.set = function (attrName, value) {
      if (_data[attrName] === value)
        return;
      _data[attrName] = value;
      let listenerFns = _changeListeners[attrName];
      listenerFns.forEach(function (listenerFn) {
        if (typeof listenerFn === "function")
          listenerFn();
      });
    };
    this.get = function (attrName) {
      return _data[attrName];
    };
    this.getFullData = function () {
      return _data;
    };
    this.subscribe = function (attrName, listenerFn) {
      _changeListeners[attrName].push(listenerFn);
    };
  }
}

function EntityView(model) {
  this.template = function (index) {
    return ` 
    <div class="row">

      <div class="col">
            <div class="form-group">
              <label for="" class="label">Entity Name</label>
              <input type="text" id="entityName" class="input" />
            </div>

            <div class="form-group">
              <label for="" class="label">Operator</label>
              <select id="operator" class="input">
              <option value="=">=</option>
              <option value="!=">!=</option>
              <option value=">">></option>
              <option value="<"><</option>
              <option value="<="><=</option>
              <option value=">=">>=</option>
              <option value="IN">IN</option>
              <option value="INCLUDES">INCLUDES</option>
              <option value="BETWEEN">BETWEEN</option>
              </select>
            </div>

          <div class="form-group">
            <label for="" class="label">Value</label>
            <input type="text" id="value" class="input" />
          </div>

      </div>

      <div class="col">
          <div class="form-group">
            <label for="" class="label">Actions</label>
            <div class="actions">
              <button class="btn btn-red remove" class="remove" id="${index}">REMOVE</button>
            </div>
          </div>
      </div>

    </div>
  `;
  };

  this.$viewEle = $("<div></div>");
  let $viewEle = this.$viewEle;

  this.render = function (index) {
    $viewEle.append(this.template(index));
  };

  this.syncViewWithModel = function () {
    $("#entityName", $viewEle).val(model.get("entityName"));
    $("#operator", $viewEle).val(model.get("operator"));
    $("#value", $viewEle).val(model.get("value"));
  };

  $viewEle.on("change", "#entityName", function () {
    model.set("entityName", $(this).val());
  });

  $viewEle.on("change", "#operator", function () {
    model.set("operator", $(this).val());
  });

  $viewEle.on("change", "#value", function () {
    model.set("value", $(this).val());
  });

  $viewEle.on("click", "#getFull", function () {
    model.getFullData();
  });
}

function RuleModel() {
  //Rule Structure

  //   _rule = [
  //     { entityName: "", operator: "", value: "" },
  //     "AND",
  //     { entityName: "", operator: "", value: "" },
  //     "OR",
  //     { entityName: "", operator: "", value: "" },
  //   ];
  let _rule = [];

  this.addRelation = function (type) {
    _rule.push(`${type.toUpperCase()}`);
  };

  this.addEntity = function (data) {
    let entityModel = new EntityModel(data);
    _rule.push(entityModel.getFullData());
    return entityModel;
  };

  this.removeFromRule = (index) => {
    if (_rule.length - 1 === parseInt(index)) {
      return _rule.splice(parseInt(index), 1);
    } else {
      alert("Cannot remove this item, Please delete from last ");
    }
  };

  this.getRule = function () {
    return _rule;
  };

  this.setRule = function (rule) {
    _rule = rule;
  };
}

function RuleView(model) {
  function relationTemplate(type, index) {
    return `<div class="row">

    <div class="col">
                <h4>${type.toUpperCase()}</h4>
                </div>
                <div class="col">
                <div class="form-group">
                    <label for="" class="label">Actions</label>
                    <div class="actions">
                        <button class="btn btn-red remove" id="${index}">REMOVE</button>
                    </div>
                </div>
                </div>
            </div>`;
  }
  this.$viewEle = document.getElementById("editor");

  this.createEntity = function (entityData) {
    let index = model.getRule().length;
    if (typeof model.getRule()[index - 1] !== "object") {
      let entityModel = model.addEntity(entityData);
      let entityView = new EntityView(entityModel);
      entityView.$viewEle.appendTo(this.$viewEle);
      entityView.render(index);
      entityView.syncViewWithModel();
    } else {
      alert("Please add relation, before adding another entity");
    }
  };

  this.createRelation = function (type) {
    let index = model.getRule().length;
    if (
      model.getRule().length > 0 &&
      typeof model.getRule()[index - 1] === "object"
    ) {
      model.addRelation(type);
      let _template = relationTemplate(type, index);
      let relationElement = $("<div></diV>");
      relationElement.html(_template);
      relationElement.appendTo(this.$viewEle);
    } else {
      alert("Please add entity first");
    }
  };

  this.render = function () {
    let _current_rule = model.getRule();
    model.setRule([]);

    $(this.$viewEle).html("");
    _current_rule.forEach((item) => {
      if (typeof item === "object") {
        this.createEntity(item);
      } else if (typeof item === "string") {
        this.createRelation(item);
      }
    });
  };
}

//helper function

function checkForEmpty(rule) {
  let checkEmptyValue = (entity) => {
    let values = Object.values(entity);
    return values.includes("");
  };

  rule = rule.map((item) => {
    if (typeof item === "object") {
      return checkEmptyValue(item);
    }
  });
  return rule.includes(true);
}

function convertToString(rule) {
  rule = rule.map((item) => {
    if (typeof item === "object") {
      return `${item.entityName} ${item.operator} ${item.value}`;
    } else {
      return item;
    }
  });
  return rule.join(" ");
}

$(document).ready(() => {
  let ruleModel = new RuleModel();
  let ruleView = new RuleView(ruleModel);
  let editMode = false;
  let editIndex = null;

  function removeFromRule(e) {
    if ($(e.target).hasClass("remove")) {
      let index = e.target.id;
      let itemRemoved = ruleModel.removeFromRule(index);
      if (itemRemoved) ruleView.render();
    }
  }

  function saveRule() {
    let _rule = ruleModel.getRule();
    if (!checkForEmpty(_rule)) {
      let rules = JSON.parse(localStorage.getItem("rules")) || [];
      if (editMode) {
        rules[editIndex] = _rule;
        editMode = false;
        editIndex = null;
      } else {
        rules.push(_rule);
      }
      localStorage.setItem("rules", JSON.stringify(rules));
      ruleModel.setRule([]);
      ruleView.render();
      getAllRules();
    } else {
      alert("Please fill all entity values");
    }
  }

  function getRuleItemHtml(ruleString, index) {
    let _temp = ` <div class="row">
        <div class="col">${ruleString}</div>
        <div class="col">
          <button class="btn btn-green edit" class="remove" id="edit-${index}">Edit</button>
          <button class="btn btn-red delete" class="remove" id="delete-${index}">Delete</button>
        </div>
      </div>`;
    return _temp;
  }

  function getAllRules() {
    let _rules = JSON.parse(localStorage.getItem("rules")) || [];
    let $ruleView = $("#rules");
    $ruleView.html("");
    if (_rules.length > 0) {
      _rules.forEach((item, index) => {
        let itemString = convertToString(item);
        let itemHtml = getRuleItemHtml(itemString, index);
        $ruleView.append(itemHtml);
      });
    }
  }

  function deleteRule(index) {
    let _rules = JSON.parse(localStorage.getItem("rules")) || [];
    _rules.splice(index, 1);
    localStorage.setItem("rules", JSON.stringify(_rules));
    getAllRules();
  }

  function editRule(index) {
    let _rules = JSON.parse(localStorage.getItem("rules")) || [];
    let ruleToEdit = _rules[parseInt(index)];
    ruleModel.setRule(ruleToEdit);
    ruleView.render();
  }

  document
    .getElementById("addEntity")
    .addEventListener("click", () => ruleView.createEntity());
  document
    .getElementById("addAnd")
    .addEventListener("click", () => ruleView.createRelation("AND"));
  document
    .getElementById("addOr")
    .addEventListener("click", () => ruleView.createRelation("OR"));

  document.getElementById("saveRule").addEventListener("click", saveRule);
  document
    .getElementById("editor")
    .addEventListener("click", (e) => removeFromRule(e));
  getAllRules();

  document.getElementById("rulesView").addEventListener("click", (e) => {
    if ($(e.target).hasClass("delete")) {
      let index = e.target.id.split("-")[1];
      deleteRule(index);
    }
  });

  document.getElementById("rulesView").addEventListener("click", (e) => {
    if ($(e.target).hasClass("edit")) {
      let index = e.target.id.split("-")[1];
      editMode = true;
      editIndex = index;
      editRule(index);
    }
  });
});
