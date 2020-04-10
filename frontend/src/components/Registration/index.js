import React from "react";

const Registration = () => {
  return (
    <div>
      <div class="uk-child-width-expand@s uk-text-center" uk-grid>
        <from class="uk-grid-small" uk-grid>
          <fieldset class="uk-fieldset">
            <legend class="uk-legend">Join As Content Creator</legend>
            <div class="uk-margin">
              <input
                class="uk-input uk-form-width-medium"
                type="text"
                placeholder="Name"
              ></input>
            </div>
            <div class="uk-margin">
              <input
                class="uk-input uk-form-width-medium"
                type="text"
                placeholder="Email"
              ></input>
            </div>
            <div class="uk-margin">
              <div class="uk-inline">
                <span
                  class="uk-form-icon uk-form-icon-flip"
                  uk-icon="icon: lock"
                ></span>
                <input
                  class="uk-input uk-form-width-medium"
                  type="password"
                  placeholder="password"
                ></input>
              </div>
            </div>
            <div class="uk-margin">
              <textarea
                class="uk-form-width-large"
                rows="5"
                placeholder="Tell us about you"
              ></textarea>
            </div>
          </fieldset>
          <button class="uk-button uk-button-primary" type="submit">Apply</button>
        </from>
      </div>
    </div>
  );
};
export default Registration;
