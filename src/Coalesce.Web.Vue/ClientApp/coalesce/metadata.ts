
export type PrimitiveType = "string" | "number"  | "boolean"
export type ValueType = PrimitiveType | "date" | "enum"
export type SimpleType = PrimitiveType | "date"
export type ObjectType = "model" | "object"
export type CustomTypeKind = "model" | "object" | "enum"
export type NonCollectionType = ValueType | ObjectType
export type TypeDiscriminator = NonCollectionType | "collection"

export type Role = "value" | "primaryKey" | "foreignKey" | "referenceNavigation" | "collectionNavigation"

export interface IHaveMetadata {
    readonly $metadata: ModelType
}

export interface Domain {
    // models: { [modelName: string]: ModelMetadata },
    // externalTypes: { [modelName: string]: ExternalTypeMetadata },
    types: { [modelName: string]: ModelType | ExternalType }
    enums: { [modelName: string]: EnumType },
}

export interface Metadata {
    readonly type: TypeDiscriminator
    readonly name: string
    displayName: string
}


interface CustomReferenceTypeBase extends Metadata {
    readonly props: { [propName in string]: Property } 

    // The property that holds the value that represents this model.
    readonly displayProp?: Property
}
export interface ExternalType extends CustomReferenceTypeBase {
    readonly type: "object"
}
export interface ModelType extends CustomReferenceTypeBase {
    readonly type: "model"
    readonly methods: { [methodName in string]: Method }

    // We re-define this for models as non-optional
    readonly displayProp: Property

    // The primary key property.
    readonly keyProp: Property
}

export interface EnumValue<TEnum> {
    readonly strValue: keyof TEnum
    readonly displayName: string
    readonly value: number
}

export type EnumValues<TEnum> = 
  { [strValue in keyof TEnum]: EnumValue<TEnum> } 
& { [n: number]: EnumValue<TEnum> | undefined } 
& object

export function getEnumMeta<TEnum=any>(values: EnumValue<TEnum>[]): {
    readonly valueLookup: EnumValues<TEnum>,
    readonly values: EnumValue<TEnum>[]
} {
    return {
        valueLookup: {
            ...values.reduce((obj, v) => Object.assign(obj, {
                [v.strValue]: v, 
                [v.value]: v
            } as EnumValues<TEnum>), {} as any)
        }, 
        values: values
    }
}
export interface EnumType<TEnum=any> extends Metadata {
    readonly type: "enum"
    // readonly enum: TEnum // TODO: does this belong here? Not sure. See the metadata generator for more thoughts.
    readonly valueLookup: EnumValues<TEnum>
    readonly values: EnumValue<TEnum>[]
}



export type CustomType = 
  ExternalType 
| ModelType 
| EnumType

export type CollectableType = CustomType | SimpleType





interface PropMetaBase extends Metadata {
    readonly role: Role
}
export interface PrimitiveProperty extends PropMetaBase {
    readonly type: PrimitiveType
}
export interface DateProperty extends PropMetaBase {
    readonly type: "date"
}
export interface EnumProperty extends PropMetaBase {
    readonly type: "enum"
    readonly typeDef: EnumType
}
export interface ObjectProperty extends PropMetaBase {
    readonly type: "object"
    readonly typeDef: ExternalType
}
export interface ModelProperty extends PropMetaBase {
    readonly type: "model"
    readonly typeDef: ModelType
    readonly foreignKey: Property
}
export interface CollectionProperty extends PropMetaBase {
    readonly type: "collection"
    readonly typeDef: CollectableType
    readonly foreignKey?: Property
}
export type Property = 
  PrimitiveProperty
| DateProperty
| EnumProperty
| ObjectProperty
| ModelProperty
| CollectionProperty





export interface Method extends Metadata  {
    readonly params: Property[]
}
