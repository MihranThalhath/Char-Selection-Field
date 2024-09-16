/** @odoo-module **/

import { _t } from "@web/core/l10n/translation";
import { registry } from "@web/core/registry";
import { standardFieldProps } from "@web/views/fields/standard_field_props";
import { SelectionField } from "@web/views/fields/selection/selection_field";

export class CharSelectionField extends SelectionField {
    static template = "char_selection_field.CharSelectionField";
    static props = {
        ...standardFieldProps,
        placeholder: { type: String, optional: true },
        required: { type: Boolean, optional: true },
        domain: { type: Array, optional: true },
        autosave: { type: Boolean, optional: true },
    };
    static defaultProps = {
        autosave: false,
    };

    /**
     * @param {Event} ev
     */
    onChange(ev) {
        let value;
        if (ev.target.value) {
            try {
                value = JSON.parse(ev.target.value);
            } catch (e) {
                value = ev.target.value;
            }
        } else {
            value = null; // or any default value you prefer
        }
        switch (this.type) {
            case "many2one":
                if (value === false) {
                    this.props.record.update(
                        { [this.props.name]: false },
                        { save: this.props.autosave }
                    );
                } else {
                    this.props.record.update(
                        {
                            [this.props.name]: this.options.find((option) => option[0] === value),
                        },
                        { save: this.props.autosave }
                    );
                }
                break;
            case "selection":
                this.props.record.update(
                    { [this.props.name]: value },
                    { save: this.props.autosave }
                );
                break;
        }
    }
}

export const charSelectionField = {
    component: CharSelectionField,
    displayName: _t("Selection"),
    supportedTypes: ["selection"],
    isEmpty: (record, fieldName) => record.data[fieldName] === false,
    extractProps({ attrs, viewType }, dynamicInfo) {
        const props = {
            autosave: viewType === "kanban",
            placeholder: attrs.placeholder,
            required: dynamicInfo.required,
            domain: dynamicInfo.domain(),
        };
        if (viewType === "kanban") {
            props.readonly = dynamicInfo.readonly;
        }
        return props;
    },
};

registry.category("fields").add("char_selection", charSelectionField);
